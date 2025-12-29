import livrosData from "../../data/bd.json"
import BtnStatus from "../tags/btns/BtnStatus";
import {LuClock} from "react-icons/lu"
import {IoCalendarClearOutline} from "react-icons/io5"
import { Link } from "react-router-dom";
//w-40 h-56 imagem
function CardReservas({estado})
{
    const livrosReservado = livrosData.livros.filter(
            livro => livro.estado === estado
        );

    return(
        <div className="w-full">
            {livrosReservado.map(livro =>(
                <div key={livro.id} className="bg-branco-100 flex flex-col gap-10 p-10  sm:flex-row items-center">
                    <article>
                        <img src={livro.capa} alt="Imagem" className="w-40 h-56 object-cover flex-shrink-0 rounded-md" loading="lazy" />
                    </article>
                    <article className="sm:items-center">
                        <p className="mt-2 text-lg "> {livro.titulo} </p>
                        <p className="text-cinza-900 mt-2"> {livro.autor} </p>
                        <BtnStatus estado={livro.estado} label={livro.label}/>
                        <div className="flex flex-col sm:flex-row gap-4 md:justify-between">
                            <button className="bg-branco-50 text-cinza-900  flex gap-2  mb-5" > 
                                <IoCalendarClearOutline size={25}/> 
                                <p>Reservardo em dd/mm/aa</p>
                            </button>
                            <button className="bg-branco-50 text-cinza-900   flex gap-2  mb-5" > 
                                <LuClock size={25}/> 
                                <p>Prazo em dd/mm/aa</p>
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 md:justify-between">
                            <Link to={`/livros/${livro.id}`} className="bg-laranja-500 text-branco-100 px-4 p-2 rounded-lg mb-5">Ver Detalhes</Link>
                            <button className="p-2   px-5 bg-branco-50 border border-cinza-500 rounded-lg mb-5">Cancelar Reservas</button>
                        </div>
                
                    </article>

                </div>
            ))}
            
        </div>
    );
}
export default CardReservas;