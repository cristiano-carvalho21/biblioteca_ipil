import { Link } from "react-router-dom";
import {FiArrowRight} from "react-icons/fi";

function HeaderCardItem({variant})
{
    return(
        <main>
            {variant === "popular" ?(
                <section className="flex justify-between p-10 bg-branco-100 sm:flex-row">
                    <article>
                        <h1 className="font-bold text-lg mb-2">Livros Populares</h1>
                        <p className="text-sm">Os mais procurados pelos alunos</p>
                    </article>
                    <article> 
                        <Link to="/catalogo" className="bg-laranja-100 text-laranja-500 p-3 font-bold flex items-center gap-2 rounded-lg ">
                            <p>Ver todos</p> <FiArrowRight size={25} className="mt-1"/ >
                        </Link> 
                    </article>
                </section>
            ) : variant === "recente" ?(
                <section className="flex justify-between p-10 bg-branco-100 mt-20 sm:flex-row">
                    <article>
                        <h1 className="font-bold text-lg mb-2">Adicionadas Recentemente</h1>
                        <p className="text-sm">Novidade no acervo</p>
                    </article>
                    <article> 
                        <Link to="/exposicoes" className="bg-laranja-100 text-laranja-500 p-3 font-bold rounded-lg">
                            Ver exposições
                        </Link> 
                    </article>
                </section>
            ) : (
                null
            )}
        </main>

    );
}
export default HeaderCardItem;