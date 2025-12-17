import {eventos} from "../../data/bd.json"
import {LuClock} from "react-icons/lu"
import {IoCalendarClearOutline} from "react-icons/io5"

function CardEvento({estado})
{
    const eventosFiltrados = eventos.filter(
        evento => evento.estado === estado
    );
    return(
        <div className=" relative w-full h-100 mb-20">
            {eventosFiltrados.map(evento =>(
                <div key={evento.id}>
                    <article>
                        <img src={evento.capa} alt="" className="h-72 w-full" />
                        <span className={`badgeExpo ${estado === "Destaque" ? "badgeExpo-destaque" : estado === "Evento" ? "badgeExpo-evento" : ""}`}> {evento.estado} </span>
                    </article>
                    <div className="border border-cinza-700 rounded-b-2xl">
                    <article className="ms-10">
                        <h1 className="mt-5 text-2xl "> {evento.titulo} </h1>
                        <p className="text-cinza-900 mt-2"> {evento.descricao} </p>
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
                        <div className="space-x-10 mt-5 mb-3 flex items-center justify-center">
                            <button className="bg-laranja-500 text-branco-100 px-10 p-2 rounded-lg">Participar</button>
                            <button className="p-2 px-10 bg-cinza-300 text-cinza-900 border border-cinza-700 rounded-lg">Ver Mais</button>
                        </div>

                    </article>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default CardEvento;