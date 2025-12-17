import { FiStar } from "react-icons/fi";

function WelcomeExposicoes()
{
    return(
        <section className="bg-laranja-500 h-64">
            <article className="text-branco-100 p-10">
                <div className="flex items-center gap-3"> 
                    <FiStar size={40}/> 
                    <h1 className="pt-5 text-4xl">Exposições e Novidades</h1>
                </div>
                <p className="pt-3 text-xl">Explore o nosso acervo digtal e reserve seus livros favoritos com apenas alguns cliques</p>
            </article>          
        </section>
    );
}
export default WelcomeExposicoes;