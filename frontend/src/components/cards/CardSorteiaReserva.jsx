import {livros} from "../../data/bd.json"
import {useEffect, useState} from "react"
import MinBtnStatus from "../tags/btns/BtnStatus";

function CardSorteiaReserva()
{
    const [livroSorteiado, setLivrosSorteiados] = useState(null);
    useEffect(() => {
        const livrosReservado = livros.filter(livro => livro.estado === "Pendente" || livro.estado === "Reservado")

        if(livrosReservado.length === 0){
            setLivrosSorteiados(null);
            return;
        }
        const index = Math.floor(Math.random() * livrosReservado.length);
        setLivrosSorteiados(livrosReservado[index]);
    }, []);

        if(!livroSorteiado){
            return <p>Nenhum livro pendente ou reservado encontrado.</p>
        }

    return(
        <div className="w-full h-auto ms-10">
            
                <div key={livroSorteiado.id} className="bg-branco-100 flex gap-10 mb-20 h-40">
                    <article>
                        <img src={livroSorteiado.capa} alt="foto" className="w-32 h-full rounded-lg" loading="lazy" />
                    </article>
                    <article>
                        <p className="mt-2 text-lg "> {livroSorteiado.titulo} </p>
                        <p className="text-cinza-900 mb-5"> {livroSorteiado.autor} </p>
                        <button>
                            <MinBtnStatus estado={livroSorteiado.estado} label={livroSorteiado.label}/>
                            <p>{livroSorteiado.criterio}</p>
                        </button>
                    </article>
                </div>
        
        </div>
    );
}
export default CardSorteiaReserva;