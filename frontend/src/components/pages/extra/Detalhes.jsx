import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import {livros} from "../../../data/bd.json"
import { FiCheckCircle } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import {AiOutlineFileText, AiOutlineBook} from "react-icons/ai";
import {MdPersonOutline} from "react-icons/md"
import { LuBookOpen } from "react-icons/lu";
import {HiOutlineHashtag} from "react-icons/hi"
import {IoCalendarClearOutline} from "react-icons/io5"
import BtnStatus from "../../tags/btns/BtnStatus";

function Detalhes()
{
    const {id} = useParams();
    const livro = livros.find((livro) => livro.id === Number(id));
    if(!livro) return <p>Nenhum livro encontrado</p>
    return(
        <main className="w-full h-full p-10">   
            <div className="flex items-center gap-3">
                <Link to="/catalogo" > <FiArrowLeft size={30}/> </Link>
                <h1>Voltar ao Catálogo</h1>
            </div> 
            
            <section className="grid grid-cols-[auto_1fr] w-full h-full gap-5">
                <article className="p-5">
                    <img src={livro.capa} alt="" className="h-auto w-full"/>
                    <div>
                        <BtnStatus estado={livro.estado} label={livro.label}/>
                    </div>

                    <div className=" justify-center items-center w-full">
                        <button className={`btnForDetalhe ${livro.estado === "Reservado" ? "btnForDetalhe-ok" : 
                        livro.estado === "Pendente" ? "btnForDetalhe-ko" : livro.estado === "Disponível" ? "btnForDetalhe-ok" :
                            livro.estado === "Emprestado" ? "btnForDetalhe-ko" : ""}`}>
                            {livro.estado === "Disponível" ? "Reservar Livro" : livro.estado === "Emprestado" ? "Indisponível"
                               : livro.estado === "Pendente" ? "Aguardando Disponiblidade" : livro.estado === "Reservado" ? "Livro Reservado" :""                    
                            }
                        </button>
                    </div>
                </article>
                <article className="p-5 grid grid-rows">
                    <div className="space-y-10">
                        <h1 className="text-2xl pt-5">{livro.titulo}</h1>
                        <div className="grid grid-cols-2">
                            <div className="grid grid-cols space-y-5">
                                <label className="flex items-center gap-3">
                                    <MdPersonOutline size={40} className="bg-laranja-100 text-laranja-500 px-1"/>
                                    <span>
                                        <p className="text-sm text-cinza-700">Autor</p>
                                        <p> {livro.autor} </p>
                                    </span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <LuBookOpen size={40} className="bg-laranja-100 text-laranja-500 px-1"/>
                                    <span>
                                        <p className="text-sm text-cinza-700">Categória</p>
                                        <p> {livro.categoria} </p>
                                    </span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <HiOutlineHashtag size={40} className="bg-laranja-100 text-laranja-500 px-1"/>
                                    <span>
                                        <p className="text-sm text-cinza-700">ISBN</p>
                                        <p> {livro.isbn} </p>
                                    </span>
                                </label>
                            </div>
                            <div className="grid grid-cols space-y-5">
                                <label className="flex items-center gap-3">
                                    <IoCalendarClearOutline size={40} className="bg-laranja-100 text-laranja-500 px-1"/>
                                    <span>
                                        <p className="text-sm text-cinza-700">Ano de publicação</p>
                                        <p> {livro.data_publicacao} </p>
                                    </span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <AiOutlineFileText size={40} className="bg-laranja-100 text-laranja-500 px-1"/>
                                    <span>
                                        <p className="text-sm text-cinza-700">Páginas</p>
                                        <p> {livro.n_paginas} </p>
                                    </span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <AiOutlineBook size={40} className="bg-laranja-100 text-laranja-500 px-1"/>
                                    <span>
                                        <p className="text-sm text-cinza-700">Editora</p>
                                        <p> {livro.editora} </p>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-2xl">Descrição</h1>
                        <article>
                            {livro.descricao}
                        </article>
                    </div> 
                    <div className="space-y-4">
                        <h1 className="text-2xl">Sumário</h1>
                        <article>
                            <ul>
                                {livro.sumario}
                            </ul>
                        </article>
                    </div>
                </article>
            </section>
        </main>
    );
}
export default Detalhes;