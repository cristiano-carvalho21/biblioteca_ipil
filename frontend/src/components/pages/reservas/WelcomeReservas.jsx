import {livros} from "../../../data/bd.json"

function WelcomeReservas()
{
    
    const livrosReservados = livros.filter(livro => livro.estado === "Reservado" || livro.estado === "Pendente");
    const qtdLivrosReservados = livrosReservados.length;

    return(
        <section>
            <article>
                <h1 className="text-3xl mb-3">Minhas Reservas</h1>
                <p className="text-cinza-900">Gerencie suas reservas e empréstimos</p>
            </article>
            <article className="mt-10 mb-10">
                <p>Reservas Ativas ({qtdLivrosReservados}) </p>
            </article>
        </section>
    );
}
export default WelcomeReservas;