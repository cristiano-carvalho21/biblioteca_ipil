import {eventos} from "../../data/bd.json"
import {LuClock, LuStar} from "react-icons/lu"
import {IoCalendarClearOutline} from "react-icons/io5"

function CardEventoMaster({extra})
{
    const eventosFiltrados = eventos.filter(
        evento => evento.extra === extra
    );

    return(
        <>
        {eventosFiltrados.map(evento => (
           <div key={evento.id} className=" relative w-full h-72 grid grid-cols-2  gap-10 mt-10 border border-cinza-700 rounded-md">
     
                    <article>
                        <img src={evento.capa} alt="Imagem" className="w-full h-72  rounded-md " loading="lazy"/>
                        <span className={`badgeExpo ${extra === "destaque_master" ? "badgeExpo-destaque" : ""}`}> 
                            <LuStar size={20} className="text-yellow-300 "/> <p className="ps-1">{evento.estado}</p> 
                        </span>
                    </article>
                <article>
                    <button className="mt-5 badgeExpo-evento bg-blue-100 px-3 py-2 rounded-2xl"> {evento.label} </button>
                    <h1 className="mt-5 text-2xl"> {evento.titulo} </h1>
                    <p className="text-cinza-900 mt-2"> {evento.descricao} </p>
                    <div className="space-x-10 mt-5">
                        <button className="bg-laranja-500 text-branco-100 px-10 p-2 rounded-lg">Participar</button>
                        <button className="p-2 px-10 bg-cinza-300 text-cinza-900 border border-cinza-700 rounded-lg">Ver Mais</button>
                    </div>

                    <div className="mt-5">
                        <button className="bg-branco-50 text-cinza-900  flex gap-2  mb-2" > 
                            <IoCalendarClearOutline size={25}/> 
                            <p> {evento.data} </p>
                        </button>
                        <button className="bg-branco-50 text-cinza-900   flex gap-2  mb-2" > 
                            <LuClock size={25}/> 
                            <p> {evento.local} </p>
                        </button>
                    </div>
                </article>

            </div>
            ))}
        
        </>
            
    
    );
}
export default CardEventoMaster;