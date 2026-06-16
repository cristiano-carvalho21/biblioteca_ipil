import re
from django.utils import timezone
from django.db.models import Count
from rapidfuzz import process
import random

from administracao.models import ConfiguracaoSistema
from accounts.models import Perfil, AlunoOficial, FuncionarioOficial
from livros.models import (
    Reserva, Livro, Emprestimo, Categoria,
    Autor, Exposicao
)

from .memory import obter_memoria_inteligente, resolver_followup
from .nlp_model import prever, normalizar, reduzir_repeticoes
from .rag_engine import buscar_livros
from .resposta import (
    resposta_saudacao, resposta_saudacao_breve, resposta_saudacao_time,
    resposta_lista_livros, resposta_livro_recente, resposta_livros_recentes,
    resposta_livros_populares, resposta_livro_popular, resposta_livros_menos_populares,
    resposta_livro_menos_popular, resposta_lista_categorias, resposta_categoria_top, 
    resposta_categorias_recentes, resposta_categorias_poucas, resposta_categoria_livro_recente, 
    resposta_categorias_populares, resposta_categoria_mais_popular, resposta_lista_autores, 
    resposta_autor_top, resposta_autores_recentes, resposta_autores_poucos, resposta_autor_livro_recente, 
    resposta_autores_populares, resposta_autor_popular, resposta_lista_exposicoes, resposta_poder_reservar, 
    resposta_poder_emprestar, resposta_relatorio_alunos, resposta_relatorio_funcionarios, resposta_relatorio_reservas_ativas, 
    resposta_relatorio_emprestimos_ativos, resposta_quantidade_livros, resposta_quantidade_categorias, resposta_quantidade_autores, 
    resposta_quantidade_exposicoes, resposta_reservas_qtd, resposta_emprestimos_qtd, resposta_multas, resposta_regras_emprestimo,
    resposta_horario_atendimento, resposta_dias_atendimento, resposta_sem_resultados, resposta_fallback
)

# =====================================================
# 🧹 UTILITÁRIOS
# =====================================================

def limpar_texto(texto):
    texto = normalizar(texto)
    return reduzir_repeticoes(texto).strip()


def dividir_perguntas(texto):
    return [
        p.strip()
        for p in re.split(r"[?.,;]| e | também | alem disso | depois |\n", texto)
        if len(p.strip()) > 1
    ]


def formatar_lista(qs, campo="titulo", vazio="Sem resultados."):
    itens = list(qs)
    if not itens:
        return vazio

    return "\n".join(
        f"• {getattr(i, campo)}"
        for i in itens if getattr(i, campo, None)
    )

# =====================================================
# 📚 BASE
# =====================================================

# =========================
# 🔍 MATCH INTELIGENTE
# =========================
def extrair_categoria(texto):
    categorias = list(Categoria.objects.values_list("nome", flat=True))
    match = process.extractOne(texto, categorias)
    return match[0] if match and match[1] > 70 else None
 

def extrair_autor(texto):
    autores = list(Autor.objects.values_list("nome", flat=True))
    match = process.extractOne(texto, autores)
    return match[0] if match and match[1] > 70 else None
 

# =========================
# 📚 LISTAGENS
# =========================
def livros_por_categoria_geral():
    return "\n".join(
        f"\n📂 {c.nome}:\n" +
        "\n".join(f"• {l.titulo}" for l in Livro.objects.filter(categoria=c))
        for c in Categoria.objects.all()
        if Livro.objects.filter(categoria=c).exists()
    ) or "Infelizmente o acervo encontrasse vazio, ou seja sem dados."


def livros_por_autor_geral():
    return "\n".join(
        f"\n👤 {a.nome}:\n" +
        "\n".join(f"• {l.titulo}" for l in Livro.objects.filter(autor=a))
        for a in Autor.objects.all()
        if Livro.objects.filter(autor=a).exists()
    ) or "Infelizmente o acervo encontrasse vazio, ou seja sem dados."


def livros_lista():
    livros = Livro.objects.all()
    return resposta_lista_livros(livros)

    
# =========================
# 🔥 FILTROS DINÂMICOS
# =========================
def livros_por_categoria_nome(nome):
    livros = Livro.objects.filter(categoria__nome__icontains=nome)
    #return "\n".join(f"• {l.titulo}" for l in livros) or "Nenhum livro encontrado."
    return resposta_lista_livros(livros)


def livros_por_autor_nome(nome):
    livros = Livro.objects.filter(autor__nome__icontains=nome)
    #return "\n".join(f"• {l.titulo}" for l in livros) or "Nenhum livro encontrado."
    return resposta_lista_livros(livros)


# =========================
# 📊 ESTATÍSTICAS
# =========================
def livros_recentes(limit=4):
    livros = Livro.objects.order_by("-created_at")[:limit]
    return resposta_livros_recentes(livros)


def livro_mais_recente():
    livro = Livro.objects.order_by("-created_at").first()
    #return f"📚 O livro mais recente é: {livro.titulo}" if livro else "Sem livros."
    return resposta_livro_recente(livro.titulo)



def livros_populares(limit=4):
    livros = Livro.objects.annotate(total=Count("reservas")).order_by("-total")[:limit]
    return resposta_livros_populares(livros)


def livro_mais_popular():
    livro = Livro.objects.annotate(total=Count("reservas")).order_by("-total").first()
    return resposta_livro_popular(livro.titulo)


def livros_menos_populares(limit=4):
    livros = Livro.objects.annotate(total=Count("reservas")).order_by("total")[:limit]
    return resposta_livros_menos_populares(livros)


def livro_menos_popular():
    livro = Livro.objects.annotate(total=Count("reservas")).order_by("total").first()
    return resposta_livro_menos_popular(livro.titulo)


def categorias_lista():
    categorias = Categoria.objects.all()
    return resposta_lista_categorias(categorias)


def categoria_top():
    categoria = Categoria.objects.annotate(total=Count("livros")).order_by("-total").first()
    return resposta_categoria_top(categoria.nome)


def categorias_recentes(limit=4):
    categorias = Categoria.objects.order_by("-created_at")[:limit]
    return resposta_categorias_recentes(categorias)


def categorias_poucos_livros(limit=4):
    categorias = Categoria.objects.annotate(total=Count("livros")).order_by("total")[:limit]
    return resposta_categorias_poucas(categorias)


def categoria_livro_mais_recente():
    livro = Livro.objects.order_by("-created_at").first()
    return resposta_categoria_livro_recente(livro.categoria.nome)

def categorias_populares(limit=4):
    livros = Livro.objects.annotate(total=Count("reservas")).order_by("-total")[:limit]
    #return "\n".join(f"• {l.categoria.nome}" for l in livros) or "Sem dados."
    categorias = ("\n".join(f"• {l.categoria.nome}" for l in livros))
    return resposta_categorias_populares(categorias)


def categoria_mais_popular():
    livro = Livro.objects.annotate(total=Count("reservas")).order_by("-total").first()
    return resposta_categoria_mais_popular(livro.categoria.nome)

def autores_lista():
    autores = Autor.objects.all()
    return resposta_lista_autores(autores)


def autor_top():
    autor = Autor.objects.annotate(total=Count("livros")).order_by("-total").first()
    return resposta_autor_top(autor.nome)


def autores_recentes(limit=4):
    autores = Autor.objects.order_by("-created_at")[:limit]
    return resposta_autores_recentes(autores)


def autores_poucos_livros(limit=4):
    autores = Autor.objects.annotate(total=Count("livros")).order_by("total")[:limit]
    return resposta_autores_poucos(autores)


def autor_livro_mais_recente():
    livro = Livro.objects.order_by("-created_at").first()
    return  resposta_autor_livro_recente(livro.autor.nome)
    

def autores_populares(limit=4):
    livros = Livro.objects.annotate(total=Count("reservas")).order_by("-total")[:limit]
    #return "\n".join(f"• {l.autor.nome}" for l in livros) or "Sem dados."
    autores = ("\n".join(f"• {l.autor.nome}" for l in livros))
    return resposta_autores_populares(autores)


def autor_mais_popular():
    livro = Livro.objects.annotate(total=Count("reservas")).order_by("-total").first()
    return resposta_autor_popular(livro.autor.nome)
    f"👤 O Autor mais popular é: {livro.autor.nome}" if livro else "Sem dados."


def exposicoes_lista():
    exposicoes = Exposicao.objects.all()
    return resposta_lista_exposicoes(exposicoes)
    
""" 
def eventos_lista():
    return "\n".join(f"• {e.titulo}" for e in Evento.objects.all()) or "Sem eventos." """



# =====================================================
# 🔐 PERMISSÕES
# =====================================================

def obter_perfil(user):
    return Perfil.objects.filter(user=user).first()


#🧠 1. DETECTAR TIPO DE PERFIL (ESSENCIAL)
def tipo_perfil(perfil):
    if hasattr(perfil, "aluno_oficial"):
        return "aluno_oficial"
    
    if hasattr(perfil, "funcionario_oficial"):
        return "funcionario_oficial"
    
    return "desconhecido"


#🎯 2. QUEM PODE FAZER EMPRÉSTIMOS
def pode_fazer_reserva(user):
    perfil = Perfil.objects.filter(user=user).first()

    if not perfil:
        return False, "Perfil não encontrado."

    tipo = tipo_perfil(perfil)

    if tipo in ["aluno_oficial", "funcionario_oficial"]:
        if perfil.estado == "Suspenso":
            return False, "❌ O teu perfil está suspenso devido a atrasos."

        return True, "✅ Podes fazer reservas."

    return False, resposta_poder_reservar


def pode_fazer_emprestimo(user):
    perfil = Perfil.objects.filter(user=user).first()

    if not perfil:
        return False, "Perfil não encontrado."

    tipo = tipo_perfil(perfil)

    if tipo == "funcionario_oficial":
        if perfil.estado == "Suspenso":
            return False, "❌ O teu perfil está suspenso devido a atrasos."

        return True, "✅ Podes fazer empréstimos."

    return False, resposta_poder_emprestar

# =====================================================
# 💰 CONFIGURAÇÕES
# =====================================================

def obter_regras_multa():
    c = ConfiguracaoSistema.objects.first()
    if not c:
        return "Sem configurações."

    return (
        f"💰 Atraso: {c.multa_por_dia} Kz/dia\n"
        f"💥 Dano: {c.multa_por_dano} Kz\n"
        f"📕 Perda: {c.multa_por_perda} Kz"
    )


def obter_regras_emprestimo():
    c = ConfiguracaoSistema.objects.first()
    if not c:
        return "Sem configuração."

    return (
        f"📚 Duração: {c.dias_emprestimo} dias\n"
        f"📦 Limite: {c.limite_livros_estudante}"
    )


# =====================================================
# 🧠 CONFIDENCIAL
# =====================================================

def consultas_confidenciais(user, intencao):

    perfil = obter_perfil(user)

    if not perfil:
        return None

    tipo = tipo_perfil(perfil)

    INTENCOES_ADMIN = {
        "relatorio_alunos",
        "relatorio_funcionarios",
        "relatorio_reservas_ativos",
        "emprestimos_ativos",
    }

    if intencao in INTENCOES_ADMIN and tipo != "funcionario_oficial":
        return [
            "🔒 Não tens permissão para consultar relatórios administrativos."
        ]

    # Apenas funcionários podem consultar relatórios administrativos
    if tipo != "funcionario_oficial":
        return None

    if intencao == "relatorio_alunos":
        from accounts.models import AlunoOficial
        return resposta_relatorio_alunos(AlunoOficial.objects.count(), AlunoOficial)

    if intencao == "relatorio_funcionarios":
        from accounts.models import FuncionarioOficial
        return resposta_relatorio_funcionarios(FuncionarioOficial.objects.count(), FuncionarioOficial)

    if intencao == "relatorio_reservas_ativos":
        total = Reserva.objects.filter(estado="em_uso").count()
        reservas = Reserva.objects.filter(estado="em_uso")
        return resposta_relatorio_reservas_ativas(total, reservas)

    if intencao == "relatorio_emprestimos_ativos":
        total = Emprestimo.objects.filter(acoes="ativo").count()
        emprestimos = Emprestimo.objects.filter(acoes="ativo")
        return resposta_relatorio_emprestimos_ativos(total, emprestimos)

    return None

# =====================================================
# 🔥 RECOMENDAÇÃO
# =====================================================

def recomendar_livros(texto):

    categoria = extrair_categoria(texto)

    if categoria:
        return recomendar_categoria(categoria)

    autor = extrair_autor(texto)

    if autor:
        return recomendar_autor(autor)

    return recomendar_descricao(texto)


def recomendar_categoria(nome):
    livros = Livro.objects.filter(categoria__nome__icontains=nome)
    return "📚 Por categoria:\n" + formatar_lista(livros)


def recomendar_autor(nome):
    livros = Livro.objects.filter(autor__nome__icontains=nome)
    return "📚 Por autor:\n" + formatar_lista(livros)


def recomendar_descricao(texto):
    res = buscar_livros(texto)
    if not res:
        return resposta_sem_resultados()
    return "📚 Por descrição:\n" + "\n".join(f"• {r['livro'].titulo}" for r in res)


# =====================================================
# 🧠 INTENT REGISTRY (SEM LÓGICA ESPALHADA)
# =====================================================

INTENT_MAP = {

    # SAUDAÇÕES
    "saudacao": lambda u: resposta_saudacao(),
    "saudacao_breve": lambda u: resposta_saudacao_breve(),
    "saudacao_time": lambda u: (
        "Bom dia " if timezone.now().hour < 12 else
        "Boa tarde " if timezone.now().hour < 18 else
        "Boa noite "
    ) + resposta_saudacao_time(timezone.now().hour),

    "livros_lista": lambda u: livros_lista(),
    "livros_qtd": lambda u: resposta_quantidade_livros(Livro.objects.count()),
    "livro_recente": lambda u: livro_mais_recente(),
    "livro_popular": lambda u: livro_mais_popular(),
    "livro_menos_popular": lambda u: livro_menos_popular(),
    "livros_recentes": lambda u: livros_recentes(),
    "livros_populares": lambda u: livros_populares(),
    "livros_menos_populares": lambda u: livros_menos_populares(),

    # LIVROS POR CATEGORIA
    "livros_categoria": lambda u: livros_por_categoria_geral(),

    # LIVROS POR AUTOR
    "livros_autor": lambda u: livros_por_autor_geral(),

    # CATEGORIAS
    "categorias_lista": lambda u: categorias_lista(),
    "categorias_qtd": lambda u: resposta_quantidade_categorias(Categoria.objects.count()),
    "categoria_top": lambda u: categoria_top(),
    "categorias_recentes": lambda u: categorias_recentes(),
    "categorias_populares": lambda u: categorias_populares(),
    "categorias_poucas": lambda u: categorias_poucos_livros(),
    "categoria_livro_recente": lambda u: categoria_livro_mais_recente(),
    "categoria_mais_requisitada": lambda u: categoria_mais_popular(),
    

    # AUTORES
    "autores_lista": lambda u: autores_lista(),
    "autores_qtd": lambda u: resposta_quantidade_autores(Autor.objects.count()),
    "autor_top": lambda u: autor_top(),
    "autores_recentes": lambda u: autores_recentes(),
    "autores_populares": lambda u: autores_populares(),
    "autores_poucos": lambda u: autores_poucos_livros(),
    "autor_livro_recente": lambda u: autor_livro_mais_recente(),
    "autor_mais_requisitado": lambda u: autor_mais_popular(),


    # EVENTOS
    "exposicoes_lista": lambda u: exposicoes_lista(),
    "exposicoes_qtd": lambda u: resposta_quantidade_exposicoes(Exposicao.objects.count()),
    # "eventos_lista": lambda u: eventos_lista(),
    # "eventos_qtd": lambda u: f"{Evento.objects.count()} eventos.",

    # CONTAGEM
    "reservas_qtd": lambda u: resposta_reservas_qtd(Reserva.objects.filter(usuario=u).count()),
    "emprestimos_qtd": lambda u: resposta_emprestimos_qtd(Emprestimo.objects.filter(reserva__usuario=u).count()),

    # REGRAS
    "multas": lambda u: obter_regras_multa(),
    "regras_emprestimo": lambda u: obter_regras_emprestimo(),

    # PERMISSÕES (DA TUA VERSÃO ANTIGA RESTAURADA)
    "poder_reservar": lambda u: resposta_poder_reservar(),
    "poder_emprestar": lambda u: resposta_poder_emprestar(),
    
    # Atendimento no espaço da biblioteca
    "horario_atendimento": lambda u: resposta_horario_atendimento(),
    "dias_atendimento": lambda u: resposta_dias_atendimento(),

    "relatorio_alunos": lambda u: resposta_relatorio_alunos(AlunoOficial.objects.count(), AlunoOficial.objects.all()),

    "relatorio_funcionarios": lambda u: resposta_relatorio_funcionarios(FuncionarioOficial.objects.count(), FuncionarioOficial.objects.all()),

    "relatorio_reservas_ativos": lambda u: resposta_relatorio_reservas_ativas(Reserva.objects.filter(estado='em_uso').count(), Reserva.objects.filter(estado='em_uso')),

    "relatorio_emprestimos_ativos": lambda u: resposta_relatorio_emprestimos_ativos(Emprestimo.objects.filter(acoes='ativo').count(), Emprestimo.objects.filter(acoes='ativo')),
}


# =====================================================
# 🧠 CORE ENGINE
# =====================================================

def responder_intencao(intencao, texto, user):
    func = INTENT_MAP.get(intencao)
    return func(user) if func else None


# =====================================================
# 🧠 PROCESSAMENTO
# =====================================================

def processar_pergunta_unica(texto, user, chat):

    memoria = obter_memoria_inteligente(chat)

    texto = limpar_texto(texto)

    texto_norm = normalizar(texto)

    # Regras prioritárias para categorias e autores
    if re.search(r"\blivros de\b", texto_norm):
        intencao = "livros_categoria_x"

    elif re.search(r"\bobras de\b", texto_norm):
        intencao = "livros_categoria_x"

    elif re.search(r"\blivros do\b", texto_norm):
        intencao = "livros_autor_x"

    elif re.search(r"\bobras do\b", texto_norm):
        intencao = "livros_autor_x"

    else:
        intencao = prever(texto)

    # 🔐 CONFIDENCIAL (BASEADO EM INTENÇÃO, NÃO TEXTO)
    conf = consultas_confidenciais(user, intencao)
    if conf:
        return conf

    followup = resolver_followup(texto, memoria)

    # Só usa followup se NLP falhou
    if followup and intencao in ["fallback", "desconhecido", None]:
        intencao = followup

    print("🎯 INTENÇÃO:", intencao)

    # 1️⃣ INTENT ENGINE
    resposta = responder_intencao(intencao, texto, user)
    if resposta:
        return [resposta]

    texto = texto.lower()

   
    # =========================
    # 🔥 EXTRAÇÃO DINÂMICA
    # =========================

    categoria_detectada = None
    autor_detectado = None

    if intencao in [
        "livros_categoria_x",
        "livros_autor_x",
        "recomendar_livros"
    ]:
        categoria_detectada = extrair_categoria(texto)
        autor_detectado = extrair_autor(texto)


    # =========================
    # LIVROS POR CATEGORIA ESPECÍFICA
    # =========================

    if intencao == "livros_categoria_x":
        if categoria_detectada:
            return [
                f"📂 Livros da categoria {categoria_detectada}:\n"
                f"{livros_por_categoria_nome(categoria_detectada)}"
            ]
        else:
            return [
                f"Não encontrei livros com esta categoria ou descrição"
            ]


    # =========================
    # LIVROS POR AUTOR ESPECÍFICO
    # =========================

    if intencao == "livros_autor_x":
        if autor_detectado:
            return [
                f"👤 Livros do autor {autor_detectado}:\n"
                f"{livros_por_autor_nome(autor_detectado)}"
            ]
        else:
            return [
                f"Não encontrei livros deste autor"
            ]

    # =========================
    # RECOMENDAÇÕES
    # =========================

    if intencao == "recomendar_livros":
        return [recomendar_livros(texto)]

    # 3️⃣ RAG FALLBACK
    resultados = buscar_livros(texto)
    if resultados:
        return [
            "📚 Encontrei:\n" +
            "\n".join(f"• {r['livro'].titulo}" for r in resultados[:5])
        ]

    return resposta_fallback()


# =====================================================
# 🔁 MULTI PERGUNTAS
# =====================================================

def processar(texto, user, chat):

    perguntas = dividir_perguntas(texto)

    respostas = []

    for p in perguntas:
        print("🧩 Pergunta:", p)
        resp = processar_pergunta_unica(p, user, chat)
        respostas.extend(resp)

    return list(dict.fromkeys(respostas))


# =====================================================
# 🤖 RESPOSTA FINAL
# =====================================================

def gerar_resposta(pergunta, user, chat):

    perfil = obter_perfil(user)

    nome = perfil.nome.split()[0] if perfil and perfil.nome else user.username

    respostas = processar(pergunta, user, chat)

    return f"{nome} 😊\n" + "\n".join(respostas)
