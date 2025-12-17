import { LuBookOpen } from "react-icons/lu";
import {livros} from "../../../../data/bd.json"

function HeaderEmprestimo()
{
    const livrosFiltrados = livros.filter(livro => livro.estado === "Emprestado");
    const qtdLivrosFiltrados = livrosFiltrados.length;
    return(
        <section className="flex justify-between p-4">
            <article className="flex items-center gap-5">
                <LuBookOpen size={30} className="text-laranja-500 ms-5"/> <h1 className="text-2xl">Livros Emprestados</h1>
            </article>
            <p className="me-10">{qtdLivrosFiltrados} livro (s)</p>
        </section>
    );
}
export default HeaderEmprestimo;