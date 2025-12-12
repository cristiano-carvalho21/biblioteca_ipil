//import livros from "../../data/bd.json"
import {LuClock, LuStar} from "react-icons/lu"
import {IoCalendarClearOutline} from "react-icons/io5"

function CardExposicoesMaster()
{
    return(
        <div className=" relative w-full h-72 grid grid-cols-2  gap-10 mt-10 border border-cinza-700 rounded-md">
            <article>
                <img src="/image/destaque.jpg" alt="Imagem" className="w-full h-72  rounded-md " loading="lazy"/>
                <span className="flex items-center top-5 left-8 absolute bg-branco-50 px-5 py-2 gap-3 rounded-2xl"> <LuStar size={20} className="text-yellow-300"/> <p className="text-blue-500 font-bold">Em Destaque</p> </span>
            </article>
            <article>
                <button className="mt-5 text-blue-500 font-bold bg-blue-200 py-2 px-6 rounded-2xl">Novos Livros</button>
                <h1 className="mt-5 text-2xl">Artes Plásticas</h1>
                <p className="text-cinza-900 mt-2">  Explore os lançamentos mais recentes sobre Artes Plásticas e Modernas </p>
                <div className="space-x-10 mt-5">
                    <button className="bg-laranja-500 text-branco-100 px-10 p-2 rounded-lg">Participar</button>
                    <button className="p-2 px-10 bg-cinza-300 text-cinza-900 border border-cinza-500 rounded-lg">Ver Mais</button>
                </div>

                <div className="mt-5">
                    <button className="bg-branco-50 text-cinza-900  flex gap-2  mb-2" > 
                        <IoCalendarClearOutline size={25}/> 
                        <p>06 de Junho de 2026</p>
                    </button>
                    <button className="bg-branco-50 text-cinza-900   flex gap-2  mb-2" > 
                        <LuClock size={25}/> 
                        <p>Sala de exposição - 2º Andar</p>
                    </button>
                </div>
            </article>

        </div>
    );
}
export default CardExposicoesMaster;