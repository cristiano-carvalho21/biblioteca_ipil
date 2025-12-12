import livrosData from "../../data/bd.json"
import {MdPersonOutline} from "react-icons/md"
import {IoCalendarClearOutline} from "react-icons/io5"

function CardLivro()
{
    const livros = livrosData.livros;

    return(
        <div className="w-64 h-65">
            {livros.map(livro => (
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
            ))}

        </div>
    );
}
export default CardLivro;