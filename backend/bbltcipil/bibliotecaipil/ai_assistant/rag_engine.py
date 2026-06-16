import os
import threading
import numpy as np

from livros.models import Livro
from sentence_transformers import SentenceTransformer

# =====================================================
# ⚙️ CONFIGURAÇÃO
# =====================================================

# Nome padrão do modelo
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

# Se tiveres modelo local, coloca aqui:
# Exemplo:
# MODEL_PATH = r"C:\modelos\all-MiniLM-L6-v2"
MODEL_PATH = os.getenv("LOCAL_SENTENCE_MODEL", MODEL_NAME)

# Força modo offline
os.environ["TRANSFORMERS_OFFLINE"] = "1"
os.environ["HF_HUB_OFFLINE"] = "1"

# Similaridade mínima
SIMILARIDADE_MINIMA = 0.75


# =====================================================
# 🔒 ESTADO GLOBAL
# =====================================================

model = None

DOCS_CACHE = None
EMBEDDINGS_CACHE = None

model_lock = threading.Lock()
embedding_lock = threading.Lock()
cache_lock = threading.Lock()


# =====================================================
# 🧠 MODELO
# =====================================================

def carregar_modelo():
    global model

    if model is not None:
        return model

    with model_lock:
        if model is not None:
            return model

        try:
            print("📥 Carregando modelo IA...")

            model = SentenceTransformer(
                MODEL_PATH,
                local_files_only=True
            )

            print("✅ Modelo carregado com sucesso")

        except Exception as e:
            print("❌ Erro ao carregar modelo:", e)
            model = None

    return model


# =====================================================
# 📚 INDEXAÇÃO DOS LIVROS
# =====================================================

def indexar_livros():
    try:
        print("📚 Indexando livros...")

        livros = Livro.objects.select_related(
            "categoria",
            "autor"
        ).all()

        docs = []

        for livro in livros:
            titulo = livro.titulo or ""

            categoria = (
                livro.categoria.nome
                if getattr(livro, "categoria", None)
                else ""
            )

            autor = (
                livro.autor.nome
                if getattr(livro, "autor", None)
                else ""
            )

            texto = f"{titulo} {categoria} {autor}".strip()

            docs.append({
                "id": livro.id,
                "texto": texto,
                "livro": livro
            })

        print(f"✅ {len(docs)} livros indexados")
        return docs

    except Exception as e:
        print("❌ Erro ao indexar livros:", e)
        return []


# =====================================================
# 🔢 GERAR EMBEDDINGS
# =====================================================

def gerar_embeddings(docs):
    modelo = carregar_modelo()

    if modelo is None:
        return None

    if not docs:
        return None

    textos = [doc["texto"] for doc in docs if doc["texto"]]

    if not textos:
        return None

    try:
        with embedding_lock:
            print("🔢 Gerando embeddings...")

            embeddings = modelo.encode(
                textos,
                convert_to_numpy=True,
                normalize_embeddings=True
            )

            print("✅ Embeddings gerados")
            return embeddings

    except Exception as e:
        print("❌ Erro ao gerar embeddings:", e)
        return None


# =====================================================
# 💾 BASE EM CACHE
# =====================================================

def carregar_base():
    global DOCS_CACHE, EMBEDDINGS_CACHE

    if DOCS_CACHE is not None and EMBEDDINGS_CACHE is not None:
        return DOCS_CACHE, EMBEDDINGS_CACHE

    with cache_lock:
        if DOCS_CACHE is not None and EMBEDDINGS_CACHE is not None:
            return DOCS_CACHE, EMBEDDINGS_CACHE

        print("📦 Criando base vetorial...")

        docs = indexar_livros()
        embeddings = gerar_embeddings(docs)

        DOCS_CACHE = docs
        EMBEDDINGS_CACHE = embeddings

        print("✅ Base carregada em memória")

    return DOCS_CACHE, EMBEDDINGS_CACHE


# =====================================================
# ♻️ RESETAR CACHE
# =====================================================

def resetar_cache():
    global DOCS_CACHE, EMBEDDINGS_CACHE

    with cache_lock:
        DOCS_CACHE = None
        EMBEDDINGS_CACHE = None

    print("♻️ Cache resetado")


# =====================================================
# 🔎 FALLBACK TEXTUAL
# =====================================================

def busca_textual(pergunta, top_k=5):
    try:
        termo = (pergunta or "").strip().lower()

        if not termo:
            return []

        livros = Livro.objects.select_related(
            "categoria",
            "autor"
        ).filter(
            titulo__icontains=termo
        )[:top_k]

        resultados = []

        for livro in livros:
            resultados.append({
                "id": livro.id,
                "texto": livro.titulo,
                "livro": livro
            })

        return resultados

    except Exception as e:
        print("❌ Erro fallback textual:", e)
        return []


# =====================================================
# 🔍 BUSCA PRINCIPAL
# =====================================================

def buscar_livros(pergunta, top_k=5):
    print(f"🔍 Pergunta: {pergunta}")

    modelo = carregar_modelo()

    # Se modelo falhar, usa busca textual
    if modelo is None:
        print("⚠️ Modelo indisponível. Usando fallback textual.")
        return busca_textual(pergunta, top_k)

    docs, embeddings = carregar_base()

    if not docs or embeddings is None:
        print("⚠️ Base vetorial indisponível. Usando fallback textual.")
        return busca_textual(pergunta, top_k)

    try:
        with embedding_lock:
            query_vec = modelo.encode(
                pergunta,
                convert_to_numpy=True,
                normalize_embeddings=True
            )

    except Exception as e:
        print("❌ Erro embedding da pergunta:", e)
        return busca_textual(pergunta, top_k)

    try:
        scores = np.dot(embeddings, query_vec)

        top_indices = np.argsort(scores)[::-1][:top_k]

        resultados = []

        for i in top_indices:
            if scores[i] >= SIMILARIDADE_MINIMA:
                resultados.append(docs[i])

        print(f"📊 Resultados encontrados: {len(resultados)}")

        if resultados:
            return resultados

        return busca_textual(pergunta, top_k)

    except Exception as e:
        print("❌ Erro na busca semântica:", e)
        return busca_textual(pergunta, top_k)


# =====================================================
# 🚀 PRELOAD
# =====================================================

def preload():
    """
    Pré-carrega apenas o modelo.
    Não toca no banco.
    """
    print("🚀 Pré-carregando IA...")
    carregar_modelo()
    print("✅ IA pronta")