import {FiArrowRight} from "react-icons/fi";

function HeaderLivroPopular()
{
    return(
        <section className="flex justify-between p-10 bg-branco-100">
            <article>
                <h1 className="font-bold text-lg mb-2">Livros Populares</h1>
                <p className="text-sm">Os mais procurados pelos alunos</p>
            </article>

            <article> 
                <button className="bg-laranja-100 text-laranja-500 p-3 font-bold flex items-center gap-2 rounded-lg">
                     <p>Ver todos</p> <FiArrowRight size={25} className="mt-1"/ >
                </button> 
            </article>
        </section>
    );
}
export default HeaderLivroPopular;