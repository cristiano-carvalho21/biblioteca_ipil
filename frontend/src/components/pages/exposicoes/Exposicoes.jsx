import {LuStar} from "react-icons/lu"
import CardExposicoesMaster from "../../cards/CardExposicoesMaster";
import CardExposicoesEvento from "../../cards/CardExposicoesEvento";
import CardExposicoes from "../../cards/CardExposicoes";
import { FiAlertCircle, FiMapPin, FiPhone, FiStar } from "react-icons/fi";


function Exposicoes()
{
    return(
        <main className="mt-10 mb-20 bg-branco-100">
            <section className="bg-laranja-500 h-64">
                <article className="text-branco-100 p-10">
                    <div className="flex items-center gap-3"> 
                        <LuStar size={40}/> 
                        <h1 className="pt-5 text-4xl">Exposições e Novidades</h1>
                    </div>
                    <p className="pt-3 text-xl">Explore o nosso acervo digtal e reserve seus livros favoritos com apenas alguns cliques</p>
                </article>          
            </section>
            <section className="grid grid-rows-[auto_auto] grid-cols-1 gap-4 p-10">
                <article className="col-span-1">
                    <CardExposicoesMaster/>
                </article>
                
            </section>
            <section className="grid grid-cols-2 gap-4 p-10">
                <article>
                    <CardExposicoesEvento/>
                </article>
                <article>
                    <CardExposicoes/>
                </article>
            </section>
        </main>
    );
}
export default Exposicoes;