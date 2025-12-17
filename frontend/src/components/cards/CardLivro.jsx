import {livros} from "../../data/bd.json"
import {MdPersonOutline} from "react-icons/md"
import {IoCalendarClearOutline} from "react-icons/io5"
import BadgeLivro from "../tags/badges/BadgeLivro";
import { Link } from "react-router-dom";


function CardLivro({tipo})
{

    const livrosFiltrados = tipo ? livros.filter(
            livro => livro.extra === tipo ) : livros;

    return(
        <div className="w-full h-65 grid grid-cols-1 gap-5 p-4 bg-branco-100
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid cols-5
                    
                ">
            { livrosFiltrados.length > 0 ? (
                livrosFiltrados.map(livro => (
                <div key={livro.id} className="w-64 h-45 relative bg-branco-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
                    <img src={livro.capa} alt="Imagem" className="w-64 h-45 object-cover rounded-md " />
                    <BadgeLivro estado={livro.estado}/>

                    <div className="mt-5">
                        <p className="ms-5"> {livro.titulo} </p>
                        <p className="flex gap-2 mt-2 ms-3 items-center"> <MdPersonOutline size={30} /> {livro.autor} </p>
                        <p className="flex gap-2 mt-2 ms-3 items-center mb-5"> <IoCalendarClearOutline size={30} /> {livro.data_publicacao} - {livro.categoria} </p>
                        <Link  to={`/livros/${livro.id}`} className="bg-laranja-500 text-branco-100 w-full flex text-center justify-center p-2 rounded-lg">Ver Detalhes</Link>
                    </div>
                </div>
                ))
            ) : (
                <p>Nenhum livro encontrado</p>
            
            
            )}

        </div>
    );
}
export default CardLivro;