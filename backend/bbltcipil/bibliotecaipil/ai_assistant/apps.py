""" from django.apps import AppConfig

class AiAssistantConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ai_assistant'

    def ready(self):
        pass
 """



from django.apps import AppConfig
import threading
import os


class AiAssistantConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ai_assistant'

    def ready(self):

        # Evita execução duplicada do autoreload do Django
        if os.environ.get('RUN_MAIN') != 'true':
            return

        from .rag_engine import preload, carregar_base

        def iniciar_ia():
            try:
                print("🚀 Inicializando IA...")

                # Carrega modelo
                preload()

                # Cria embeddings e cache vetorial
                carregar_base()

                print("✅ IA inicializada com sucesso")

            except Exception as e:
                print("❌ Erro ao iniciar IA:", e)

        # Thread separada para não bloquear o Django
        threading.Thread(
            target=iniciar_ia,
            daemon=True
        ).start()