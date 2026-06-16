from django.contrib import admin
from .models import Livro, Autor, Categoria, Reserva, Emprestimo, Notificacao, Exposicao, Reserva_Exposicao  # exemplo

admin.site.register(Livro)
admin.site.register(Autor)
admin.site.register(Categoria)
admin.site.register(Reserva)
admin.site.register(Emprestimo)
admin.site.register(Notificacao)
admin.site.register(Exposicao)
# admin.site.register(Evento)
admin.site.register(Reserva_Exposicao)

#Forma mais clássica e profissional
#@admin.register(Perfil)
#@admin.register(Autor)
#@admin.register(Categoria)
#@admin.register(Reserva)
#@admin.register(Emprestimo)
#@admin.register(Notificacao)
#@admin.register(Exposicao)
#@admin.register(Evento)
#@admin.register(Participacao)
#@admin.register(Reserva_Exposicao)
