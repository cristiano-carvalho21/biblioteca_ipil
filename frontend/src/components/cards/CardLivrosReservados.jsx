import {IoCalendarClearOutline} from "react-icons/io5"
import {FiArrowRight} from "react-icons/fi"
import {LuClock} from "react-icons/lu"

function CardLivrosReservados()
{
    return(
        <main className="bg-branco-100 max-w-screen">
            <section className="flex justify-between items-center p-3 ">
                <article className="flex items-center gap-5">
                    <IoCalendarClearOutline size={30} className="text-laranja-500"/ >
                    <h1 className="text-2xl">Minhas Reservas</h1>
                </article>
                <article className="pe-16 text-laranja-500  gap-3 flex items-center"> <p>Ver Todos</p> <FiArrowRight size={25}/ > </article>
            </section>

            <section className="ms-20 flex gap-10 bg-cinza-100 p-5">
                <article className="w-[15%]  h-[20%]">
                    <img src="/image/capa8.jpg" className="w-full h-full rounded-lg" alt="" />
                </article>
                <article className="space-y-2">
                    <h1 className="text-lg">História e Cultura dos Povos Indígenas</h1>
                    <p className="text-cinza-900">Mateus Araújo</p>
                    <label className="text-laranja-500 bg-laranja-100 flex items-center gap-2 ps-3 rounded-lg"> <LuClock size={25} className="text-laranja-500"/ > <p>Devolução em 26/06/2026</p></label>
                </article>
            </section>
        </main>
    );
}

export default CardLivrosReservados;