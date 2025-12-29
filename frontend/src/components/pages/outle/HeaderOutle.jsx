import {MdPersonOutline} from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

function HeaderOutle({page})
{
    return(
        <main>
            {page === "gestaolivro" ?(
                <section className="flex relative flex-wrap justify-between p-5">
                    <article className="space-y-1">
                        <h1 className="text-3xl">Gestão de Livros</h1>
                        <p className="text-cinza-900">Gerir catálogo completo da biblioteca</p>
                    </article>
                    <button className="bg-laranja-500 text-branco-100 px-4 h-10 text-lg  rounded-lg">+ Adicionar Livro</button>
                </section>
            ) : page === "estudantes" ?(
                <section className="flex justify-between p-5">
                    <article className="space-y-1">
                        <h1 className="text-3xl">Gestão de Livros</h1>
                        <p className="text-cinza-900">Gerir estudantes registados na biblioteca</p>
                    </article>
                    <button className="flex items-center bg-laranja-500 text-branco-100 px-4 h-10 text-lg  rounded-lg">
                    <MdPersonOutline size={25}/> + Adicionar Estudante
                    </button>
                </section>
            ) : page === "emprestimos" ?(
                <section className="flex justify-between p-5">
                    <article className="space-y-1">
                        <h1 className="text-3xl">Gestão de Empréstimos</h1>
                        <p className="text-cinza-900">Gerir e acompanhar empréstimos de livros</p>
                    </article>
                    <article className="flex gap-5">
                        <button className="flex items-center bg-cinza-300  border border-cinza-700 px-4 h-10 text-lg  rounded-lg">
                            <FiCheckCircle size={25}/> Registar Devolução
                        </button>
                        <button className="bg-laranja-500 text-branco-100 px-4 h-10 text-lg  rounded-lg">+ Novo Empréstimo</button>
                    </article>
                </section>  
            ) : page === "categoriasautores" ?(
                <section className="space-y-1">
                    <h1 className="text-3xl">Gestão de Livros Categórias & Autores</h1>
                    <p className="text-cinza-900">Gerir categórias de livros e autores</p>
                </section>
            ) : (
                null
            )}
        </main>
    );
}
export default HeaderOutle;