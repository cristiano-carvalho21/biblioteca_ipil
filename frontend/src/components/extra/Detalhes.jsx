import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import {livros} from "../../data/bd.json"
import { FiCheckCircle } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";

function Detalhes()
{
    const {id} = useParams();
    const livro = livros.find((livro) => livro.id === Number(id));
    if(!livro) return <p>Nenhum livro encontrado</p>
    return(
        <main className="w-full h-full">   
            <div className="flex items-center gap-3">
                <Link to="/catalogo" > <FiArrowLeft size={30}/> </Link>
                <h1>Voltar ao Catálogo</h1>
            </div> 
            
            <section className="grid grid-cols-2">
                <article className="p-5">
                    <img src={livro.capa} alt="" className="h-1/2 w-3/4"/>
                    <div className="flex flex-cols justify-center items-center w-3/4">
                        <button className="btnStatus btnStatus-reservado px-2 pe-10">
                            <FiCheckCircle size={30}/>
                            <span>
                                <p className="me-36"> {livro.estado} </p>
                                <p className="text-sm ms-2"> {livro.label} </p>
                            </span>
                        </button>

                    </div>
                    <div className="flex flex-cols justify-center items-center w-3/4">
                        <button className="bg-laranja-500 text-branco-100 w-1/2 flex text-center text-xl justify-center p-4 py-3 rounded-lg">
                            {livro.estado}
                        </button>
                    </div>
                </article>
                <article className="p-5 grid grid-rows-3">
                    <div >
                        <h1>{livro.titulo}</h1>
                        <div className="grid grid-cols-2">
                            <div>
                                <label> Autor, Categoria</label>
                                <label> Autor, Categoria</label>
                                <label> Autor, Categoria</label>
                            </div>
                            <div>
                                <label> Autor, Categoria</label>
                                <label> Autor, Categoria</label>
                                <label> Autor, Categoria</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>Descrição</h1>
                    </div>
                    <div>
                        <h1>Sumário</h1>
                    </div>
                </article>
            </section>
        </main>
    );
}
export default Detalhes;