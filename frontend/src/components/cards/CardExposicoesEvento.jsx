//import livros from "../../data/bd.json"
import {LuClock} from "react-icons/lu"
import {IoCalendarClearOutline} from "react-icons/io5"

function CardExposicoesEvento()
{
    return(
        <div className=" relative w-full h-100   gap-10 mb-20 ">
            <article>
                <img src="/image/evento.jpg" alt="Imagem" className="w-full h-72  rounded-t-md " loading="lazy"/>
                <span className="flex items-center top-5 left-8 absolute bg-branco-50 px-6 py-2 rounded-2xl">  <p className="text-blue-500 font-bold">Evento</p> </span>
            </article>
            <div className="border border-cinza-700  rounded-b-2xl">
                <article className="ms-10">
                    <h1 className="mt-5 text-2xl ">Semana Louca: desafios e exercícios</h1>
                    <p className="text-cinza-900 mt-2"> Seleção especial de livros de química, física, matemática, informática </p>
                    <div className="mt-5">
                        <button className="bg-branco-50 text-cinza-900  flex gap-2  mb-2" > 
                            <IoCalendarClearOutline size={25}/> 
                            <p>21 de Junho de 2026</p>
                        </button>
                        <button className="bg-branco-50 text-cinza-900   flex gap-2  mb-2" > 
                            <LuClock size={25}/> 
                            <p>Sala de exposição - 2º Andar</p>
                        </button>
                    </div>
                    <div className="space-x-10 mt-5 mb-3 flex items-center justify-center">
                        <button className="bg-laranja-500 text-branco-100 px-10 p-2 rounded-lg">Participar</button>
                        <button className="p-2 px-10 bg-cinza-300 text-cinza-900 border border-cinza-500 rounded-lg">Ver Mais</button>
                    </div>

                </article>

            </div>
            
        </div>
    );
}
export default CardExposicoesEvento;