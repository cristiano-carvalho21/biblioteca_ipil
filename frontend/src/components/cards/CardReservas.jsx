import livrosData from "../../data/bd.json"
import BtnStatus from "../tags/btns/BtnStatus";
import {LuClock} from "react-icons/lu"
import {IoCalendarClearOutline} from "react-icons/io5"

function CardReservas({estado})
{
    const livrosReservado = livrosData.livros.filter(
            livro => livro.estado === estado
        );

    return(
        
        <div className="w-full  h-full">
            {livrosReservado.map(livro =>(
                <div key={livro.id} className="bg-branco-100 flex gap-10 mb-20 h-72">
                    <article>
                        <img src={livro.capa} alt="Imagem" className="w-48 h-full  rounded-md " loading="lazy" />
                    </article>
                    <article>
                        <p className="mt-2 text-lg "> {livro.titulo} </p>
                        <p className="text-cinza-900 mt-2"> {livro.autor} </p>
                        <BtnStatus estado={livro.estado} label={livro.label}/>

                        <div className="flex justify-between space-x-40 gap-40">

                            <button className="bg-branco-50 text-cinza-900  flex gap-2  mb-5" > 
                                <IoCalendarClearOutline size={25}/> 
                                <p>Reservardo em dd/mm/aa</p>
                            </button>

                            <button className="bg-branco-50 text-cinza-900   flex gap-2  mb-5" > 
                                <LuClock size={25}/> 
                                <p>Prazo em dd/mm/aa</p>
                            </button>
                        </div>

                        <div className="space-x-10">
                            <button className="bg-laranja-500 text-branco-100 px-4 p-2 rounded-lg">Ver Detalhes</button>
                            <button className="p-2   px-5 bg-branco-50 border border-cinza-500 rounded-lg">Cancelar Reservas</button>
                        </div>
                
                    </article>

                </div>
            ))}
            
        </div>
    );
}
export default CardReservas;