from bibliotecaipil.events import emit_event
from django.core.exceptions import PermissionDenied, ValidationError
from django.db import transaction
from .models import Exposicao
from policies.reservas import validar_criacao_reserva



def criar_reserva(usuario, livro):

    from livros.models import Reserva

    validar_criacao_reserva(usuario)

    reserva = Reserva.objects.create(
        usuario=usuario,
        livro=livro
    )

    perfil = getattr(usuario, "perfil", None)
    if perfil:
        perfil.atualizar_contadores()
        perfil.atualizar_estado()

    emit_event("reserva_criada", {
        "reserva_id": reserva.id
    })

    return reserva


def marcar_emprestimo_atrasado(e):
    e.acoes = "atrasado"
    e.save(update_fields=["acoes"])

    emit_event("emprestimo_atrasado", {
        "emprestimo_id": e.id
    })
   

def cancelar_reserva(reserva, usuario):

    if reserva.usuario_id != usuario.id:
        raise PermissionDenied()

    if reserva.estado not in ["pendente", "reservado"]:
        raise PermissionDenied()

    # 🔥 capturar dados ANTES de apagar
    payload = {
        "reserva_id": reserva.id,
        "titulo": reserva.livro.titulo,
        "usuario_id": usuario.id
    }

    with transaction.atomic():
        reserva.delete()

        transaction.on_commit(lambda: emit_event(
            "reserva_cancelada",
            payload
        ))
    

