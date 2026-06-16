import random

# =====================================================
# 🎲 CORE UTIL
# =====================================================
def escolher(*respostas):
    return random.choice(respostas)

# =========================
# SAUDAÇÕES
# =========================

def resposta_saudacao():

    return escolher(
        "Olá 👋 Como posso ajudar-te hoje?",
        "Olá 👋 Estou disponível para ajudar no que precisares.",
        "Seja bem-vindo 👋 Em que posso ser útil?",
        "Olá 👋 Como posso ajudar com a biblioteca?"
    )


def resposta_saudacao_breve():

    return escolher(
        "Olá 👋",
        "Oi 👋",
        "Bem-vindo 👋",
        "Saudações 👋"
    )


def resposta_saudacao_time(periodo):

    return escolher(
        f"{periodo} 👋 Como posso ajudar?",
        f"{periodo} 👋 Em que posso ser útil?",
        f"{periodo} 👋 Estou à disposição para ajudar.",
        f"{periodo} 👋 Como posso ajudar-te hoje?"
    )


# =====================================================
# 📚 LIVROS - BÁSICO
# =====================================================
def resposta_quantidade_livros(total):
    if not total:
        return resposta_sem_resultados()

    return escolher(
        f"📚 Atualmente a biblioteca possui {total} livros registados.",
        f"📚 Existem {total} livros disponíveis no catálogo.",
        f"📚 O sistema possui {total} livros cadastrados.",
        f"📚 Foram encontrados {total} livros no acervo da biblioteca."
    )


def resposta_lista_livros(livros):
    if not livros:
        return resposta_sem_resultados()

    cabecalho = escolher(
        "📚 Estes são os livros encontrados:",
        "📚 Segue a lista de livros disponíveis:",
        "📚 Encontrei os seguintes livros:",
        "📚 O catálogo contém os seguintes títulos:"
    )

    return f"{cabecalho}\n\n" + "\n".join(f"• {l}" for l in livros)


def resposta_livro_recente(titulo):
    if not titulo:
        return resposta_sem_resultados()

    return escolher(
        f"📚 O livro adicionado mais recentemente ao catálogo é '{titulo}'.",
        f"📚 A obra mais recente registada na biblioteca é '{titulo}'.",
        f"📚 O último livro incorporado ao acervo foi '{titulo}'.",
        f"📚 Entre os registos mais recentes encontra-se o livro '{titulo}'."
    )


def resposta_livro_popular(titulo):
    if not titulo:
        return resposta_sem_resultados()

    return escolher(
        f"📚 O livro mais requisitado atualmente é '{titulo}'.",
        f"📚 Entre os livros disponíveis, '{titulo}' é o mais procurado.",
        f"📚 '{titulo}' lidera o ranking de reservas da biblioteca.",
        f"📚 Segundo os registos, '{titulo}' é o livro mais popular."
    )


def resposta_livro_menos_popular(titulo):
    if not titulo:
        return resposta_sem_resultados()

    return escolher(
        f"📚 O livro com menor número de reservas é '{titulo}'.",
        f"📚 Atualmente '{titulo}' é uma das obras menos requisitadas.",
        f"📚 O livro menos procurado pelos utilizadores é '{titulo}'.",
        f"📚 Segundo os registos, '{titulo}' possui poucas requisições."
    )


# =====================================================
# 📚 LIVROS - LISTAGENS COMPLEXAS
# =====================================================
def resposta_livros_recentes(livros):
    if not livros:
        return resposta_sem_resultados()

    return escolher(
        "📚 Estes são os livros mais recentes da biblioteca:",
        "📚 As últimas obras adicionadas ao catálogo são:",
        "📚 Encontrei os seguintes livros recentemente registados:",
        "📚 Seguem os livros mais recentes disponíveis:"
    ) + "\n\n" + "\n".join(f"• {l}" for l in livros)


def resposta_livros_populares(livros):
    if not livros:
        return resposta_sem_resultados()

    return escolher(
        "🔥 Estes são os livros mais procurados:",
        "📚 Os títulos com maior número de reservas são:",
        "📚 Atualmente estes livros destacam-se pela popularidade:",
        "📚 As obras mais requisitadas são:"
    ) + "\n\n" + "\n".join(f"• {l}" for l in livros)


def resposta_livros_menos_populares(livros):
    if not livros:
        return resposta_sem_resultados()

    return escolher(
        "📚 Estes são os livros menos requisitados:",
        "📚 As seguintes obras possuem poucas reservas:",
        "📚 Encontrei os livros com menor procura:",
        "📚 Os títulos menos populares são:"
    ) + "\n\n" + "\n".join(f"• {l}" for l in livros)


# =====================================================
# 📂 CATEGORIAS
# =====================================================
def resposta_categoria_top(nome):
    if not nome:
        return resposta_sem_resultados()


    return escolher(
        f"📂 A categoria com maior número de livros é '{nome}'.",
        f"📂 '{nome}' é atualmente a categoria mais representada no catálogo.",
        f"📂 A categoria que possui mais obras registadas é '{nome}'.",
        f"📂 Entre todas as categorias, '{nome}' destaca-se pela quantidade de livros."
    )


def resposta_lista_categorias(categorias):
    if not categorias:
        return resposta_sem_resultados()

    return escolher(
        "📂 Estas são as categorias disponíveis:",
        "📂 Encontrei as seguintes categorias:",
        "📂 O sistema possui estas categorias registadas:",
        "📂 Segue a lista de categorias:"
    ) + "\n\n" + "\n".join(f"• {c}" for c in categorias)


def resposta_quantidade_categorias(total):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"📂 Atualmente existem {total} categorias registadas.",
        f"📂 O sistema possui {total} categorias disponíveis.",
        f"📂 Foram encontradas {total} categorias no catálogo.",
        f"📂 Existem {total} categorias cadastradas."
    )


def resposta_categoria_mais_popular(nome):
    if not nome:
        return resposta_sem_resultados()


    return escolher(
        f"📂 A categoria mais procurada atualmente é '{nome}'.",
        f"📂 '{nome}' destaca-se como a categoria mais requisitada.",
        f"📂 Entre todas as categorias, '{nome}' possui maior procura.",
        f"📂 A categoria líder em reservas é '{nome}'."
    )


def resposta_categorias_poucas(categorias):
    if not categorias:
        return resposta_sem_resultados()

    return escolher(
        "📂 Estas categorias possuem poucos livros:",
        "📂 As categorias menos representadas são:",
        "📂 Encontrei categorias com poucas obras registadas:",
        "📂 Seguem as categorias com menor quantidade de livros:"
    ) + "\n\n" + "\n".join(f"• {c}" for c in categorias)


def resposta_categorias_recentes(categorias):

    if not categorias:
        return resposta_sem_resultados()

    return (
        escolher(
            "📂 Estas são as categorias mais recentes:",
            "📂 As últimas categorias registadas foram:",
            "📂 Encontrei as categorias adicionadas recentemente:",
            "📂 Seguem as categorias mais recentes:"
        )
        + "\n\n"
        + "\n".join(f"• {c}" for c in categorias)
    )


def resposta_categorias_populares(categorias):
    if not categorias:
        return resposta_sem_resultados()

    return escolher(
        "📂 Estas são as categorias mais procuradas:",
        "📂 As categorias com maior número de reservas são:",
        "📂 Atualmente estas categorias destacam-se pela popularidade:",
        "📂 Seguem as categorias mais requisitadas:"
    ) + "\n\n" + "\n".join(f"• {c}" for c in categorias)


def resposta_categoria_livro_recente(nome):
    return escolher(
        f"📂 O livro mais recente pertence à categoria '{nome}'.",
        f"📂 A categoria do último livro registado é '{nome}'.",
        f"📂 O registo mais recente está associado à categoria '{nome}'.",
        f"📂 A categoria mais recentemente atualizada é '{nome}'."
    )


# =====================================================
# 👤 AUTORES
# =====================================================
def resposta_lista_autores(autores):
    if not autores:
        return resposta_sem_resultados()

    return escolher(
        "👤 Estes são os autores registados:",
        "👤 Encontrei os seguintes autores:",
        "👤 O sistema possui estes autores cadastrados:",
        "👤 Segue a lista de autores:"
    ) + "\n\n" + "\n".join(f"• {a}" for a in autores)


def resposta_quantidade_autores(total):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"👤 Atualmente existem {total} autores registados.",
        f"👤 Foram encontrados {total} autores no sistema.",
        f"👤 O catálogo possui {total} autores cadastrados.",
        f"👤 Existem {total} autores disponíveis na base de dados."
    )


def resposta_autor_top(nome):
    if not nome:
        return resposta_sem_resultados()


    return escolher(
        f"👤 O autor com mais obras registadas é '{nome}'.",
        f"👤 '{nome}' lidera a lista de autores com maior número de livros.",
        f"👤 O autor mais representado no catálogo é '{nome}'.",
        f"👤 Entre todos os autores, '{nome}' possui mais obras registadas."
    )


def resposta_autor_popular(nome):
    if not nome:
        return resposta_sem_resultados()


    return escolher(
        f"👤 O autor mais procurado atualmente é '{nome}'.",
        f"👤 '{nome}' destaca-se como o autor mais requisitado.",
        f"👤 O autor com maior procura pelos leitores é '{nome}'.",
        f"👤 Segundo os registos, '{nome}' é o autor mais popular."
    )


def resposta_autores_recentes(autores):
    if not autores:
        return resposta_sem_resultados()

    return escolher(
        "👤 Estes são os autores mais recentes:",
        "👤 Os últimos autores registados são:",
        "👤 Encontrei os seguintes autores recentemente adicionados:",
        "👤 Seguem os autores mais recentes:"
    ) + "\n\n" + "\n".join(f"• {a}" for a in autores)


def resposta_autores_populares(autores):
    if not autores:
        return resposta_sem_resultados()

    return escolher(
        "👤 Estes são os autores mais procurados:",
        "👤 Os autores mais populares atualmente são:",
        "👤 Seguem os autores com maior procura:",
        "👤 Estes autores destacam-se pela popularidade:"
    ) + "\n\n" + "\n".join(f"• {a}" for a in autores)


def resposta_autores_poucos(autores):
    if not autores:
        return resposta_sem_resultados()

    return escolher(
        "👤 Estes autores possuem poucas obras registadas:",
        "👤 Os seguintes autores têm poucos livros no catálogo:",
        "👤 Encontrei autores com poucas obras cadastradas:",
        "👤 Estes autores apresentam menor quantidade de livros:"
    ) + "\n\n" + "\n".join(f"• {a}" for a in autores)


def resposta_autor_livro_recente(nome):
    if not nome:
        return resposta_sem_resultados()


    return escolher(
        f"👤 O autor do livro mais recente é '{nome}'.",
        f"👤 A obra adicionada mais recentemente pertence ao autor '{nome}'.",
        f"👤 O último livro registado foi escrito por '{nome}'.",
        f"👤 O autor associado ao registo mais recente é '{nome}'."
    )


# =====================================================
# 📚 EXPOSIÇÕES
# =====================================================
def resposta_lista_exposicoes(exposicoes):
    if not exposicoes:
        return resposta_sem_resultados()

    return (
        escolher(
            "🖼️ Estas são as exposições disponíveis:",
            "🖼️ Encontrei as seguintes exposições:",
            "🖼️ Atualmente estão registadas as seguintes exposições:",
            "🖼️ Segue a lista de exposições:"
        )
        + "\n\n"
        + "\n".join(f"• {e}" for e in exposicoes)
    )

def resposta_quantidade_exposicoes(total):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"🖼️ Existem atualmente {total} exposições registadas.",
        f"🖼️ O sistema possui {total} exposições disponíveis.",
        f"🖼️ Foram encontradas {total} exposições cadastradas.",
        f"🖼️ Existem {total} exposições no catálogo."
    )


# =====================================================
# 📊 CONTAGENS
# =====================================================
def resposta_reservas_qtd(total):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"📚 Possuis atualmente {total} reservas registadas.",
        f"📚 Foram encontradas {total} reservas associadas à tua conta.",
        f"📚 Tens {total} reservas no sistema.",
        f"📚 O número atual de reservas é {total}."
    )


def resposta_emprestimos_qtd(total):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"📦 Possuis atualmente {total} empréstimos registados.",
        f"📦 Foram encontrados {total} empréstimos associados à tua conta.",
        f"📦 Tens {total} empréstimos ativos no sistema.",
        f"📦 O número atual de empréstimos é {total}."
    )


# =====================================================
# 📜 REGRAS
# =====================================================
def resposta_multas(texto):
    if not texto:
        return resposta_sem_resultados()


    return escolher(
        f"⚠️ Relativamente às multas: {texto}",
        f"⚠️ As regras de multa são as seguintes: {texto}",
        f"⚠️ Segundo o regulamento da biblioteca: {texto}",
        f"⚠️ Informação sobre multas: {texto}"
    )


def resposta_regras_emprestimo(texto):
    if not texto:
        return resposta_sem_resultados()


    return escolher(
        f"📖 As regras de empréstimo são: {texto}",
        f"📖 Segundo o regulamento da biblioteca: {texto}",
        f"📖 Informações sobre empréstimos: {texto}",
        f"📖 Seguem as regras aplicáveis aos empréstimos: {texto}"
    )


# =====================================================
# 🔐 PERMISSÕES
# =====================================================
def resposta_poder_reservar():
    return escolher(
        "❌ Apenas alunos e funcionários estão autorizados a realizar reservas.",
        "❌ As reservas podem ser efetuadas por alunos e funcionários.",
        "❌ O sistema permite reservas apenas para alunos e funcionários.",
        "❌ Somente utilizadores autorizados, como alunos e funcionários, podem reservar."
    )


def resposta_poder_emprestar():
    return escolher(
        "❌ Apenas funcionários podem efetuar empréstimos de livros.",
        "❌ Os empréstimos são realizados exclusivamente por funcionários.",
        "❌ Somente colaboradores autorizados podem efetuar empréstimos.",
        "❌ A funcionalidade de empréstimo está disponível apenas para funcionários."
    )


# =====================================================
# 🕒 ATENDIMENTO
# =====================================================
def resposta_horario_atendimento():
    return escolher(
        "⏰ O horário de atendimento da biblioteca é das 08h às 17h.",
        "⏰ A biblioteca atende das 08h às 17h.",
        "⏰ O serviço de atendimento funciona entre as 08h e as 17h.",
        "⏰ Os utilizadores podem ser atendidos das 08h às 17h."
    )


def resposta_dias_atendimento():
    return escolher(
        "📅 A biblioteca funciona de segunda-feira a sexta-feira.",
        "📅 O atendimento é realizado de segunda a sexta.",
        "📅 A biblioteca está aberta durante os dias úteis.",
        "📅 Os serviços da biblioteca funcionam de segunda a sexta-feira."
    )


# =====================================================
# 📑 RELATÓRIOS
# =====================================================
def resposta_relatorio_alunos(total, alunos):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"👨‍🎓 Atualmente existem {total} alunos registados.",
        f"👨‍🎓 O sistema possui {total} alunos cadastrados.",
        f"👨‍🎓 Foram encontrados {total} alunos ativos.",
        f"👨‍🎓 O total de alunos registados é {total}.",
        f"👨‍🎓 Atualmente existem {total} estudantes registados.",
        f"👨‍🎓 O sistema possui {total} estudantes cadastrados.",
        f"👨‍🎓 Foram encontrados {total} estudantes ativos.",
        f"👨‍🎓 O total de estudantes registados é {total}."
    )+ "\n\n" + "\n".join(f"• {a}" for a in alunos)


def resposta_relatorio_funcionarios(total, funcionarios):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"👨‍🏫 Atualmente existem {total} funcionários registados.",
        f"👨‍🏫 O sistema possui {total} funcionários cadastrados.",
        f"👨‍🏫 Foram encontrados {total} funcionários ativos.",
        f"👨‍🏫 O total de funcionários registados é {total}."
    )+ "\n\n" + "\n".join(f"• {a}" for a in funcionarios)


def resposta_relatorio_reservas_ativas(total, reservas):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"📚 Existem atualmente {total} reservas ativas.",
        f"📚 O sistema possui {total} reservas em utilização.",
        f"📚 Foram encontradas {total} reservas ativas.",
        f"📚 O total de reservas ativas é {total}."
    )+ "\n\n" + "\n".join(f"• {a}" for a in reservas)


def resposta_relatorio_emprestimos_ativos(total, emprestimos):
    if not total:
        return resposta_sem_resultados()


    return escolher(
        f"📦 Existem atualmente {total} empréstimos ativos.",
        f"📦 O sistema possui {total} empréstimos em curso.",
        f"📦 Foram encontrados {total} empréstimos ativos.",
        f"📦 O total de empréstimos ativos é {total}."
    )+ "\n\n" + "\n".join(f"• {a}" for a in emprestimos)


# =====================================================
# ❌ FALLBACK GLOBAL
# =====================================================
def resposta_sem_resultados():
    return escolher(
        "Não encontrei informações correspondentes ao pedido.",
        "Não foram encontrados registos para essa consulta.",
        "De momento não existem dados disponíveis para apresentar.",
        "Não encontrei resultados relacionados com a tua pesquisa."
    )


def resposta_fallback():
    return escolher(
        "Não consegui compreender completamente o pedido. Podes reformular a pergunta?",
        "Ainda não percebi exatamente o que procuras. Podes explicar de outra forma?",
        "Não encontrei uma intenção correspondente ao pedido. Tenta formular a questão de maneira diferente.",
        "Posso não ter entendido corretamente. Podes fazer a pergunta novamente com mais detalhes?"
    )