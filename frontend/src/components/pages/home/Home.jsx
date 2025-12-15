import Welcome from "./seccoes/Welcome";
import Rotulos from "./seccoes/Rotulos";
import CardLivro from "../../cards/CardLivro";
import HeaderLivroPopular from "./seccoes/HeaderLivroPopular";
import HeaderLivroRecente from "./seccoes/HeaderLivroRecente";
import Form from "../../tags/form/Form";
import { useState } from "react";
import {livros} from "../../../data/bd.json"

function Home()
{
    const [pesquisa, setPesquisa] = useState("");
    const livrosFiltrados = livros.filter((livro) => {
        const termo = pesquisa.toLowerCase();
        return(
            livro.titulo.toLowerCase().includes(termo) || livro.autor.toLowerCase().includes(termo) ||
            livro.categoria.toLowerCase().includes(termo)
        );
    });
    console.log("Valor pesquisado:",pesquisa)
    return(
        <main className="h-full w-full">
            <Welcome/>
            <Form onPesquisar={setPesquisa}/>
            <Rotulos/>
            {pesquisa.trim() !=="" ? (
                livrosFiltrados.length > 0 ? (
                                livrosFiltrados.map(livro => (
                                <div key={livro.id} className="bg-branco-100">
                                    <img src={livro.capa} alt="Imagem" className="w-full h-45 object-cover rounded-md relative" loading="lazy" />
                                    <span className="absolute top-1 right-8 bg-branco-100  text-xs px-2 py-1 rounded-full shadow"> {livro.estado} </span>
                
                                    <div className="mt-5">
                                        <p className="ms-5"> {livro.titulo} </p>
                                        <p className="flex gap-2 mt-2 ms-3 items-center"> <MdPersonOutline size={30} /> {livro.autor} </p>
                                        <p className="flex gap-2 mt-2 ms-3 items-center"> <IoCalendarClearOutline size={30} /> {livro.data_publicacao} - {livro.categoria} </p>
                                        <button className="bg-laranja-500 text-branco-100 w-full mt-3 p-2 rounded-lg">Ver Detalhes</button>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <p>Nenhum livro encontrado</p>
                            
                            )):(
                                <>
                                    <HeaderLivroPopular/>
                                    <CardLivro tipo="popular"/>
                                    <HeaderLivroRecente/>
                                    <CardLivro tipo="recente" />
                                </>
                            )}
            
                
            <section className="mb-20 mt-20 text-center">
                <h1>Biblioteca IPIL</h1>
            </section>

        </main>
    );
}
export default Home;