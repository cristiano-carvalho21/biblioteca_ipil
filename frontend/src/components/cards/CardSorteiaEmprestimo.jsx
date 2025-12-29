import {livros} from "../../data/bd.json"
import {useEffect, useState} from "react"
import {IoCalendarClearOutline} from "react-icons/io5"

function CardSorteiaEmprestimo()
{
    const [livroSorteiado, setLivrosSorteiados] = useState(null);
    useEffect(() => {
        const livrosEmprestado = livros.filter(livro => livro.estado === "Emprestado")

        if(livrosEmprestado.length === 0){
            setLivrosSorteiados(null);
            return;
        }
        const index = Math.floor(Math.random() * livrosEmprestado.length);
        setLivrosSorteiados(livrosEmprestado[index]);
    }, []);

        if(!livroSorteiado){
            return <p>Nenhum livro emprestado encontrado.</p>
        }

    return(
        <div className="w-full h-48 ms-5">
            
                <div key={livroSorteiado.id} className="bg-branco-100 flex flex-col gap-10  sm:flex-row">
                    <article>
                        <img src={livroSorteiado.capa} alt="foto" className="w-32 h-44 object-cover aspect-square rounded-lg" loading="lazy" />
                    </article>
                    <article>
                        <p className="mt-2 text-lg"> {livroSorteiado.titulo} </p>
                        <p className="text-cinza-900 mb-5"> {livroSorteiado.autor} </p>
                        <button className="bg-laranja-100 text-laranja-500 flex items-center gap-2 px-3 rounded-md">
                            <IoCalendarClearOutline size={25}/>
                            <p>{livroSorteiado.criterio}</p>
                        </button>
                    </article>
                </div>
        
        </div>
    );
}
export default CardSorteiaEmprestimo;