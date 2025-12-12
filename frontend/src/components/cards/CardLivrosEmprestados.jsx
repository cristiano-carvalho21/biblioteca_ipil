import {LuBookOpen} from "react-icons/lu"
import {IoCalendarClearOutline} from "react-icons/io5"

function CardLivrosEmprestados()
{
    return(
        <main className="bg-branco-100 max-w-scree">
            <section className="flex justify-between items-center p-3 ">
                <article className="flex items-center gap-5">
                    <LuBookOpen size={30} className="text-laranja-500"/ >
                    <h1 className="text-2xl">Livros Emprestados</h1>
                </article>
                <article className="pe-16">1 livro (s)</article>
            </section>

            <section className="ms-20 flex gap-10 bg-cinza-100 p-5">
                <article className="w-[15%]  h-[20%] ">
                    <img src="/image/capa3.jpg" className="w-full h-full rounded-lg" alt="" />
                </article>
                <article className="space-y-2">
                    <h1 className="text-lg">Inteligência Artificial na Sala de Aula</h1>
                    <p className="text-cinza-900">Mariana Sousa Pinto</p>
                    <label className="text-laranja-500 flex items-center gap-2"> <IoCalendarClearOutline size={25} className="text-laranja-500"/ > <p>Devolução em 26/06/2026</p></label>
                </article>
            </section>
        </main>
    );
}

export default CardLivrosEmprestados;