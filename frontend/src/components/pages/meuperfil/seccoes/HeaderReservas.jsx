import { Link } from "react-router-dom";
import { IoCalendarClearOutline } from "react-icons/io5";
import {FiArrowRight} from "react-icons/fi"

function HeaderReservas()
{
    return(
        <section className="flex justify-between p-4">
            <article className="flex items-center gap-5">
                <IoCalendarClearOutline size={30} className="text-laranja-500 ms-5"/> <h1 className="text-2xl">Minhas Reservas</h1>
            </article>
            <Link to="/reservas" className="bg-laranja-100 text-laranja-500 p-3 font-bold flex items-center gap-2 rounded-lg me-10">
                    <p>Ver todos</p> <FiArrowRight size={25} className="mt-1"/ >
            </Link> 
        </section>
    );
}
export default HeaderReservas;