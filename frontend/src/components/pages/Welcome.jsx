import {livros} from "../../data/bd.json";
import InputGroup from "../tags/inputs/InputGroup"
import { FiStar } from "react-icons/fi";

function Welcome({pages})
{
    const livrosReservados = livros.filter(livro => livro.estado === "Reservado" || livro.estado === "Pendente");
    const qtdLivrosReservados = livrosReservados.length;

    return(
        <main>
            {pages === "home" ? (
                <section className="bg-laranja-500 h-96">
                    <article className="text-branco-100 p-10">
                            <h1 className="pt-5 text-4xl">Bem-vindo à Biblioteca IPIL</h1>
                            <p className="pt-3 text-xl">Explore o nosso acervo digtal e reserve seus livros favoritos com apenas alguns cliques</p>
                    </article>
                    <article className="ms-10">
                        <InputGroup page="home" type="text" placeholder="Busca por título, autor ou categória"/>
                    </article>
                </section>
            ) : pages === "catalogo" ? (
            <section>
                <article className="bg-cinza-100 p-5 h-40 mb-7">
                    <h1 className="mt-5 text-2xl mb-1">Catálogo de Livros</h1>
                    <p>Explore nosso acervo completo</p>
                </article>
            </section>
            ) : pages === "reservas" ? (
            <section>
                <article>
                    <h1 className="text-3xl mb-3">Minhas Reservas</h1>
                    <p className="text-cinza-900">Gerencie suas reservas e empréstimos</p>
                </article>
                <article className="mt-10 mb-10">
                    <p>Reservas Ativas ({qtdLivrosReservados}) </p>
                </article>
            </section>
            ) : pages === "exposicoes" ? (
            <section className="bg-laranja-500 h-64">
                <article className="text-branco-100 p-10">
                    <div className="flex items-center gap-3"> 
                        <FiStar size={40}/> 
                        <h1 className="pt-5 text-4xl sm:pb-5">Exposições e Novidades</h1>
                    </div>
                    <p className="text-xl pb-5">Explore o nosso acervo digtal e reserve seus livros favoritos com apenas alguns cliques</p>
                </article>          
            </section>
            ) : (
                null
            )}
        </main>
    );
}
export default Welcome;