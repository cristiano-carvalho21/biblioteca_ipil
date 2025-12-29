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
        <div className="w-full h-48 ms-5 ">
            
                <div key={livroSorteiado.id} className="bg-branco-100 flex flex-col gap-10  sm:flex-row">
                    <article>
                        <img src={livroSorteiado.capa} alt="foto" className="w-32 h-44 object-cover aspect-square rounded-lg" loading="lazy" />
                    </article>
                    <article>
                        <p className="mt-2 text-lg "> {livroSorteiado.titulo} </p>
                        <p className="text-cinza-900 mb-5"> {livroSorteiado.autor} </p>
                        <MinBtnStatus estado={livroSorteiado.estado} label={livroSorteiado.label}/>
                    </article>
                </div>
        
        </div>
    );
}
export default CardSorteiaReserva;