from django.db import models, transaction
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from accounts.models import Perfil
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

User = get_user_model()


# =============================
# CATEGORIA
# =============================
class Categoria(models.Model):
    nome = models.CharField(max_length=60, unique=True)
    descricao = models.CharField(max_length=250, default="")
    n_livros = models.PositiveIntegerField(default=0)

    def clean(self):
        if not self.nome or not self.nome.strip():
            raise ValidationError("Nome da categoria é obrigatório.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome


# =============================
# AUTOR
# =============================
class Autor(models.Model):
    nome = models.CharField(max_length=120)
    nacionalidade = models.CharField(max_length=60)
    total_obras = models.PositiveIntegerField(default=0)

    def clean(self):
        if not self.nome or not self.nome.strip():
            raise ValidationError("Nome do autor é obrigatório.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome


# =============================
# LIVRO
# =============================
class Livro(models.Model):

    ESTADOS = [
        ('Disponível', 'Disponível'),
        ('Indisponível', 'Indisponível'),
    ]

    titulo = models.CharField(max_length=120)
    isbn = models.CharField(max_length=13, unique=True)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE, related_name="livros")
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="livros")

    estado = models.CharField(max_length=20, choices=ESTADOS, default='Disponível')

    publicado_em = models.DateField()
    descricao = models.TextField(blank=True, null=True)
    sumario = models.TextField()
    editora = models.CharField(max_length=45)

    n_paginas = models.PositiveIntegerField(default=1)
    quantidade = models.PositiveIntegerField(default=1)

    prateleira = models.PositiveIntegerField(null=True, blank=True)
    fila = models.PositiveIntegerField(blank=True, null=True)

    capa = models.URLField(max_length=500)

    data = models.DateTimeField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):

        if not self.titulo or not self.titulo.strip():
            raise ValidationError("Título é obrigatório.")

        if self.quantidade < 0:
            raise ValidationError("Quantidade não pode ser negativa.")

        if self.n_paginas <= 0:
            raise ValidationError("Número de páginas inválido.")

        # if self.isbn and len(self.isbn) not in [10, 13]:
        #     raise ValidationError("ISBN inválido.")

        if self.isbn:
            isbn_limpo = self.isbn.replace("-", "").replace(" ", "")

            if not 10 <= len(isbn_limpo) <= 13:
                raise ValidationError("ISBN deve ter entre 10 e 13 dígitos.")

            self.isbn = isbn_limpo
            

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    @property
    def estado_atual(self):

        if self.quantidade <= 0:
            return 'Indisponível'

        if self.reservas.filter(emprestimo__acoes__in=['ativo', 'atrasado']).exists():
            return 'Emprestado'

        if self.reservas.filter(estado='reservado').exists():
            return 'Reservado'

        if self.reservas.filter(estado='pendente').exists():
            return 'Pendente'

        if self.reservas.filter(estado='em_uso').exists():
            return 'Em uso'

        if self.reservas.filter(estado='expirada').exists():
            return 'Expirada'

        return 'Disponível'

    @property
    def informacao_atual(self):
        return {
            'Disponível': "Livro disponível para reserva",
            'Reservado': "Existe reserva ativa",
            'Em uso': "Sendo usado atualmente",
            'Emprestado': "Livro atualmente emprestado",
            'Pendente': "Aguardando aprovação",
            'Indisponível': "Sem stock disponível",
        }.get(self.estado_atual, "")

    def __str__(self):
        return self.titulo


# =============================
# RESERVA (CORE BUSINESS RULES)
# =============================
class Reserva(models.Model):

    ESTADOS = [
        ('pendente', 'Pendente'),
        ('reservado', 'Reservado'),
        ('em_uso', 'Em Uso'),
        ('finalizada', 'Finalizada'),
        ('expirada', 'Expirada'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reservas")
    livro = models.ForeignKey("Livro", on_delete=models.CASCADE, related_name="reservas")

    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendente', db_index=True)

    stock_descontado = models.BooleanField(default=False)

    data_reserva = models.DateTimeField(auto_now_add=True)
    data_aprovacao = models.DateTimeField(null=True, blank=True, db_index=True)

    aprovada_por = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="reservas_aprovadas"
    )

    class Meta:
        ordering = ['-data_reserva']

    # =========================
    # VALIDATION ONLY
    # =========================
    def clean(self):

        if not hasattr(self.usuario, "perfil"):
            raise ValidationError("Usuário sem perfil não pode reservar.")

        if Reserva.objects.filter(
            usuario=self.usuario,
            livro=self.livro,
            estado__in=["pendente", "reservado", "em_uso"]
        ).exclude(pk=self.pk).exists():
            raise ValidationError("Já existe reserva ativa.")

        if self.estado == "reservado" and self.livro.quantidade <= 0:
            raise ValidationError("Sem estoque disponível.")

        if self.estado == "finalizada" and not self.aprovada_por:
            raise ValidationError("Aprovação requer administrador.")

        if self.pk:
            original = Reserva.objects.get(pk=self.pk)

            transicoes = {
                "pendente": ["reservado", "cancelada"],
                "reservado": ["em_uso", "cancelada", "expirada", "finalizada"],
                "em_uso": ["finalizada"],
                "finalizada": [],
                "expirada": [],
            }

            if self.estado != original.estado:
                if self.estado not in transicoes.get(original.estado, []):
                    raise ValidationError(
                        f"Transição inválida: {original.estado} → {self.estado}"
                    )

    # =========================
    # SAVE (REGRAS DE NEGÓCIO SEGURAS)
    # =========================
    def save(self, *args, **kwargs):

        is_update = self.pk is not None
        old_state = None
        old_stock = False

        # 🔥 capturar estado anterior real do banco
        if is_update:
            old = Reserva.objects.get(pk=self.pk)
            old_state = old.estado
            old_stock = old.stock_descontado

        # =========================
        # AUTO CAMPOS
        # =========================
        if not self.pk:
            if self.livro.quantidade > 0:
                self.estado = "reservado"
                self.data_aprovacao = timezone.now()
            else:
                self.estado = "pendente"

        if self.estado == "em_uso" and not self.data_aprovacao:
            self.data_aprovacao = timezone.now()

        # 🔥 validar antes de persistir
        self.full_clean()

        # 🔥 salvar estado base
        super().save(*args, **kwargs)

        # =========================
        # CONTROLO DE STOCK - ENTRADA EM USO
        # =========================
        entrou_em_uso = (
            is_update and
            old_state != "em_uso" and
            self.estado == "em_uso"
        )

        if entrou_em_uso and not old_stock:

            with transaction.atomic():

                livro = self.livro.__class__.objects.select_for_update().get(pk=self.livro.pk)

                if livro.quantidade <= 0:
                    raise ValidationError("Sem stock disponível.")

                livro.quantidade -= 1
                livro.save(update_fields=["quantidade"])

                Reserva.objects.filter(pk=self.pk).update(stock_descontado=True)

        # =========================
        # CONTROLO DE STOCK - FINALIZAÇÃO
        # =========================
        saiu_para_finalizada = (
            is_update and
            old_state != "finalizada" and
            self.estado == "finalizada"
        )

        if saiu_para_finalizada and old_stock:

            with transaction.atomic():

                livro = self.livro.__class__.objects.select_for_update().get(pk=self.livro.pk)

                livro.quantidade += 1
                livro.save(update_fields=["quantidade"])

                Reserva.objects.filter(pk=self.pk).update(stock_descontado=False)

    # =========================
    # STRING
    # =========================
    def __str__(self):
        return f"{self.livro.titulo} - {self.usuario.first_name} - {self.estado}"

    # =========================
    # HELPERS
    # =========================
    @property
    def perfil_oficial(self):
        return getattr(self.usuario, "perfil", None)

    @property
    def capa(self):
        return self.livro.capa

    @property
    def informacao(self):
        return {
            'pendente': "Aguardando disponibilidade",
            'reservado': "Confirmada para retirada",
            'em_uso': "Livro em utilização",
            'finalizada': "Processo concluído",
            'expirada': "Expirada automaticamente"
        }.get(self.estado, "")
    


# =============================
# EMPRESTIMO (TRANSACTION SAFE)
# =============================
class Emprestimo(models.Model):

    ACOES = [
        ('ativo', 'Ativo'),
        ('atrasado', 'Atrasado'),
        ('devolvido', 'Devolvido'),
    ]

    reserva = models.OneToOneField(Reserva, on_delete=models.CASCADE, related_name="emprestimo")

    acoes = models.CharField(max_length=20, choices=ACOES, default='ativo', db_index=True)

    data_emprestimo = models.DateField(auto_now_add=True)
    data_devolucao = models.DateField(db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['acoes', 'data_devolucao']),
        ]


    @property
    def livro(self):
        return self.reserva.livro

    @property
    def usuario(self):
        return self.reserva.usuario

    @property
    def capa(self):
        return self.reserva.livro.capa

    def __str__(self):
        return f"{self.livro.titulo} — {self.usuario.first_name} ({self.acoes})"


    def clean(self):
        
        # 🔥 validação só na criação do empréstimo
        if self.pk is None:
            if self.reserva.estado != "reservado":
                raise ValidationError("Reserva deve estar no estado 'reservado'.")

        if self.data_devolucao and self.data_devolucao < timezone.now().date():
            raise ValidationError("Data de devolução inválida.")

    def save(self, *args, **kwargs):

        is_new = self.pk is None

        self.full_clean()

        with transaction.atomic():

            if is_new:

                livro = Livro.objects.select_for_update().get(id=self.reserva.livro.id)

                if livro.quantidade <= 0:
                    raise ValidationError("Sem stock disponível.")

                livro.quantidade -= 1
                livro.save(update_fields=["quantidade"])

            super().save(*args, **kwargs)


# =============================
# NOTIFICAÇÃO
# =============================
class Notificacao(models.Model):

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True, null=True)

    tipo = models.CharField(max_length=50, default="Geral")
    lida = models.BooleanField(default=False)

    link = models.CharField(max_length=255, blank=True, null=True)

    criada_em = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if not self.titulo or not self.titulo.strip():
            raise ValidationError("Título obrigatório.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.usuario.first_name} - {self.titulo}"


class Exposicao(models.Model):

    titulo = models.CharField(max_length=255)
    capa = models.URLField(max_length=500)
    descricao = models.TextField(blank=True)
    local = models.CharField(max_length=255)
    capacidade_maxima = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()

    def __str__(self):
        return self.titulo

    # ==========================
    # 🔹 RESERVAS FILTRADAS
    # ==========================

    def reservas_ativas(self):
        return self.reservas.exclude(estado="Cancelado")

    def reservas_aprovadas(self):
        return self.reservas.filter(estado="Aprovado")

    def participacoes(self):
        return self.reservas.filter(estado="Participado")

    # ==========================
    # 🔹 CONTADORES
    # ==========================

    def total_reservas(self):
        return self.reservas_ativas().count()

    def total_aprovadas(self):
        return self.reservas_aprovadas().count()

    def total_participacoes(self):
        return self.participacoes().count()

    def vagas_disponiveis(self):
        return self.capacidade_maxima - self.total_reservas()

    # ==========================
    # 🔹 ESTADO REAL (CORRIGIDO)
    # ==========================

    def estado_atual(self):

        agora = timezone.now()

        if agora > self.data_fim:
            return "Encerrado"

        if self.total_reservas() >= self.capacidade_maxima:
            return "Esgotado"

        return "Disponível"
    

    # ==========================
    # 🔹 DESCRIÇÃO
    # ==========================

    def descricao_estado(self):

        estados = {
        'Disponível': 'Ainda há vagas disponíveis',
        'Esgotado': 'Não há mais vagas disponíveis',
        'Encerrado': 'A exposição já encerrou.',
    }

        return estados.get(self.estado_atual(), 'Estado desconhecido')

    # ==========================
    # 🔹 VALIDAÇÃO
    # ==========================

    def clean(self):

        if self.capacidade_maxima < 1:
            raise ValidationError("Capacidade deve ser maior que zero.")



class Reserva_Exposicao(models.Model):

    STATUS_CHOICES = [
        ('Reservado', 'Reservado'),
        ('Aprovado', 'Aprovado'),
        ('Participado', 'Participado'),
        ('Cancelado', 'Cancelado'),
    ]

    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    exposicao = models.ForeignKey(
        'Exposicao',
        on_delete=models.CASCADE,
        related_name='reservas'
    )

    estado = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Reservado'
    )

    data_reserva = models.DateTimeField(
        auto_now_add=True
    )

    data_aprovacao = models.DateTimeField(
        null=True,
        blank=True
    )

    data_participacao = models.DateTimeField(
        null=True,
        blank=True
    )

    class Meta:
        unique_together = ('usuario', 'exposicao')
        ordering = ['-data_reserva']

    # ==========================
    # 🔹 APROVAR
    # ==========================

    def marcar_aprovado(self):

        if self.estado != "Reservado":
            raise ValidationError(
                "Só reservas pendentes podem ser aprovadas."
            )

        self.estado = 'Aprovado'

        self.data_aprovacao = timezone.now()

        self.save()

    # ==========================
    # 🔹 PARTICIPAÇÃO
    # ==========================

    def marcar_participado(self):

        agora = timezone.now()

        # Só aprovados participam

        if self.estado != "Aprovado":
            raise ValidationError(
                "Só reservas aprovadas podem participar."
            )

        # Evento ainda não terminou

        if agora < self.exposicao.data_fim:
            raise ValidationError(
                "A exposição ainda não terminou."
            )

        # Passou mais de 1 dia

        limite = self.exposicao.data_fim + timedelta(days=1)

        if agora > limite:
            raise ValidationError(
                "O prazo para confirmação de participação expirou."
            )

        self.estado = 'Participado'

        self.data_participacao = agora

        self.save()

    # ==========================
    # 🔹 CANCELAR
    # ==========================

    def cancelar(self):

        if self.estado == "Participado":
            raise ValidationError(
                "Não pode cancelar após participação."
            )

        self.estado = 'Cancelado'

        self.save()

    def __str__(self):

        return (
            f"{self.usuario.username} -> "
            f"{self.exposicao.titulo} "
            f"({self.estado})"
        )





















