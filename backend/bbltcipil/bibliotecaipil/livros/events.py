""" from django.apps import apps
from django.contrib.auth import get_user_model



# =========================
# EVENTO: RESERVA CANCELADA
# =========================
@register_event("reserva_cancelada")
def notificar_reserva_cancelada(payload):
    Notificacao = apps.get_model("livros", "Notificacao")
    User = get_user_model()

    try:
        usuario = User.objects.get(id=payload["usuario_id"])

        Notificacao.objects.get_or_create(
            usuario=usuario,
            titulo="Reserva cancelada",
            descricao=f"A reserva do livro '{payload['titulo']}' foi cancelada.",
            defaults={
                "tipo": "Reserva",
                "link": "/reservas"
            }
        )

    except User.DoesNotExist:
        print(f"❌ Usuário não encontrado: {payload['usuario_id']}")


# =========================
# EVENTO: RESERVA CRIADA
# =========================
@register_event("reserva_criada")
def notificar_reserva_criada(payload):
    Reserva = apps.get_model("livros", "Reserva")
    Notificacao = apps.get_model("livros", "Notificacao")

    try:
        r = Reserva.objects.get(id=payload["reserva_id"])

        usuario = r.usuario

        Notificacao.objects.get_or_create(
            usuario=usuario,
            titulo="Reserva criada",
            descricao=f"Sua reserva do livro '{r.livro.titulo}' foi criada com sucesso.",
            defaults={
                "tipo": "Reserva",
                "link": f"/reservas#{r.id}"
            }
        )

    except Reserva.DoesNotExist:
        print(f"❌ Reserva não encontrada: {payload['reserva_id']}")
 """


from bibliotecaipil.events import register_event
from django.contrib.auth import get_user_model

User = get_user_model()


# =========================
# REGISTRO DE EVENTOS
# =========================
_EVENT_REGISTRY = {}


def register_event(event_name):
    def wrapper(func):
        _EVENT_REGISTRY[event_name] = func
        return func
    return wrapper


def emit_event(event_name, payload):
    
    #Dispara eventos sem quebrar o Django startup.
    
    print(f"EVENTO: {event_name} - {payload}")

    handler = _EVENT_REGISTRY.get(event_name)
    if handler:
        handler(payload)




@register_event("reserva_criada")
def notificar_reserva_criada(payload):
    from livros.models import Reserva, Notificacao

    r = Reserva.objects.get(id=payload["reserva_id"])
    perfil = r.perfil_oficial
    usuario = perfil.user if perfil else r.usuario

    Notificacao.objects.get_or_create(
        usuario=usuario,
        titulo="Reserva criada",
        descricao=f"Sua reserva do livro '{r.livro.titulo}' foi criada com sucesso.",
        defaults={
            "tipo": "Reserva",
            "link": f"/reservas#reserva-{r.id}"
        }
    )


