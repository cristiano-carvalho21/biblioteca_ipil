import {MdPersonOutline} from "react-icons/md"
import {AiOutlineMail} from "react-icons/ai";
import {HiOutlineHashtag, HiOutlineLogout} from "react-icons/hi"
import { LuFilePen } from "react-icons/lu";


function CardMeuPerfil()
{
    return(
        <main className="max-w-md h-screen">
            <section>
                <article className="bg-laranja-500 h-32  relative rounded-t-2xl"></article>
                <button className="w-24 h-24 rounded-full mt-20 ms-5 absolute top-40 flex items-center justify-center bg-branco-50 text-laranja-500"><MdPersonOutline size={70} /></button>
            </section>
            <div className="w-full  border border-t-0 border-cinza-500 rounded-b-2xl bg-branco-100">
                
            <section className="pt-16 ms-2 me-2 space-y-6 mb-10">
                <article className="ms-3">
                    <p>Cristiano De Carvalho</p>
                    <p className="text-cinza-900">Estudante</p>
                </article>
                <article className="space-y-2 ms-3">
                    <span className="flex items-center gap-2"> 
                        <AiOutlineMail size={25} className="text-laranja-500"/> <p className="text-cinza-900">cristianocarvalh207@gmail.com</p>
                    </span>
                    <span className="flex items-center gap-2"> 
                        <HiOutlineHashtag size={25} className="text-laranja-500"/> <p className="text-cinza-900">Matricula: 71286</p>
                    </span>
                </article>
                <article className="flex justify-between space-x-2">
                    <div className="flex flex-col bg-laranja-100 text-laranja-500 py-5 px-10 rounded-lg">
                        <label className="text-center">1</label> 
                        <label>Emprestado</label>
                    </div>
                    <div className="flex flex-col bg-laranja-100 text-laranja-500 py-5 px-10 rounded-lg">
                        <label className="text-center">1</label>
                        <label>Reservado</label>
                    </div>
                </article>
                <article className=" space-y-8">
                    <button className="w-full bg-laranja-500 text-branco-100 flex items-center py-3 justify-center rounded-lg"><LuFilePen size={25} /> <p>Editar Perfil</p> </button>
                    <button className="w-full border border-cinza-700 flex items-center justify-center rounded-lg py-3"><HiOutlineLogout size={25}/> <p>Sair</p> </button>

                </article>
            </section>
            </div>
        </main>
    );
}
export default CardMeuPerfil;