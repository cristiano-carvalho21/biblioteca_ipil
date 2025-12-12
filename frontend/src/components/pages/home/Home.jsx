import Form from "../../tags/form/Form"
import CardLivroPopular from "../../cards/CardLivroPopular";
import CardLivroRecente from "../../cards/CardLivroRecente";
import {LuClock, LuStar} from "react-icons/lu"
import { HiOutlineTrendingUp } from "react-icons/hi";
import {FiArrowRight} from "react-icons/fi"

function Home()
{
    return(
        <main className="h-full w-full">
            <section className="bg-laranja-500 h-96">

                <article className="text-branco-100 p-10">
                    <h1 className="pt-5 text-4xl">Bem-vindo à Biblioteca IPIL</h1>
                    <p className="pt-3 text-xl">Explore o nosso acervo digtal e reserve seus livros favoritos com apenas alguns cliques</p>
                </article>
                 
                 <article className="ms-10">
                    <Form/>
                 </article>
                

            </section>
            
            <section className="flex flex-wrap w-full justify-between mt-10 p-10 gap-5">

                <div className="flex gap-2 p-7 rounded-lg bg-branco-100">
                     <button className="bg-laranja-100 text-laranja-500 p-3 rounded-lg" > <HiOutlineTrendingUp size={35}/> </button>
                     <span>
                        <p className="text-lg">6</p>
                        <p>Livros Disponíveis</p>
                     </span>
                </div>

                <div className="flex gap-2 p-7 rounded-lg bg-branco-100">
                    <button className="bg-laranja-100 text-laranja-500 p-3 rounded-lg" > <LuClock size={35}/> </button>
                    <span>
                        <p className="text-lg">2</p>
                        <p>Minhas Reservas</p>
                    </span>
                    
                </div>

                <div className="flex gap-2 p-7 rounded-lg bg-branco-100">
                    <button className="bg-laranja-100 text-laranja-500 p-3 rounded-lg" > <LuStar size={35}/> </button>
                    <span>
                        <p className="text-lg">8</p>
                        <p>Total no Acervo</p>
                    </span>
                </div>
               
            </section>

            <section>

                <article className="flex justify-between p-10 bg-branco-100">
                    <div>
                        <h1 className="font-bold text-lg mb-2">Livros Populares</h1>
                        <p className="text-sm">Os mais procurados pelos alunos</p>
                    </div>

                    <div> <button className="bg-laranja-100 text-laranja-500 p-3 font-bold flex items-center gap-2 rounded-lg"> <p>Ver todos</p> <FiArrowRight size={25} className="mt-1"/ ></button> </div>
                </article>

                <article className="grid grid-cols-1 gap-4 p-4
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid cols-5
                ">
                    <CardLivroPopular/>
                </article>

            </section>

            <section className="mt-10">

                <article className="flex justify-between p-10">
                    <div>
                        <h1 className="font-bold text-lg mb-2">Adicionadas Recentemente</h1>
                        <p className="text-sm">Novidade no acervo</p>
                    </div>

                    <div> <button className="bg-laranja-100 text-laranja-500 p-3 font-bold">Ver exposições</button> </div>
                </article>

                <article className="grid grid-cols-1 gap-4 p-4
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid cols-5
                ">
                    <CardLivroRecente/>
                </article>
            
            </section>

            <section className="mbt-5 mt-20 text-center">
                <h1>Biblioteca IPIL</h1>
            </section>

        </main>
    );
}
export default Home;