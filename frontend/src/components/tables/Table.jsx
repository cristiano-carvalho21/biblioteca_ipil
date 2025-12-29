import {livros, alunos, emprestimos, categorias, autores} from "../../data/bd.json";
import { obterIniciais } from "../utilitarios/Utils";
import { LuFilePen } from "react-icons/lu";
import { FiEye, FiTrash2 } from "react-icons/fi";
import {HiOutlineFolder} from "react-icons/hi2";
import {MdPersonOutline} from "react-icons/md"


function Table({tipo})
{
    const totalAlunos = alunos.length;
    const alunosAtivos = alunos.filter(aluno => aluno.extra === "Ativo");
    const qtdAlunosAtivos = alunosAtivos.length;
    const alunosPendentes = alunos.filter(aluno => aluno.extra === "Pendente");
    const qtdAlunosPendentes = alunosPendentes.length;
    const alunosSuspensos = alunos.filter(aluno => aluno.extra === "Suspenso");
    const qtdAlunosSuspensos = alunosSuspensos.length;

    const emprestAtivos = emprestimos.filter(emprest => emprest.estado === "Ativo");
    const qtdemprestAtivo = emprestAtivos.length;
    const emprestAtrasados = emprestimos.filter(emprest => emprest.estado === "Atrasado");
    const qtdemprestAtrasado = emprestAtrasados.length;
    let devolucoes = 0;
    let vencimentoProximo = 0;



    return(
        <main>
            {tipo === "gestaolivro" ?(
                <div className="w-full overflow-x-auto">
                    <table className="table-auto min-w-full text-left px-5 bg-branco-100 shadow-md  rounded-lg">
                    <thead className="bg-cinza-300 ">
                        <tr>
                            <th className="py-1 px-5">Livro</th>
                            <th className="py-1 px-5">Autor</th>
                            <th className="py-1 px-5">Categória</th>
                            <th className="py-1 px-5">Ano</th>
                            <th className="py-1 px-5">Estado</th>
                            <th className="py-1 px-5">Empréstimo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cinza-300">
                        {livros.map(livro => (
                            <tr className="hover:bg-cinza-100">
                                <td className="flex items-center gap-5">
                                    <div className="pb-2 pt-2"> <img src={livro.capa} alt="" className="w-24 rounded-lg" /> </div>
                                    <div className="flex flex-col">
                                        <label> {livro.titulo} </label>
                                        <label className="text-cinza-900"> ISBN - {livro.isbn} </label>
                                    </div>
                                </td>
                                <td className="px-5"> {livro.autor} </td>
                                <td className="px-5"> {livro.categoria} </td>
                                <td className="px-5"> {livro.data_publicacao} </td>
                                <td className="px-5">  
                                    <button className={`px-4 py-2 rounded-lg ${livro.estado === "Disponível" ? "bg-green-100 text-green-700" : "bg-cinza-300 text-preto-500" }`}>
                                        {livro.estado}
                                    </button>
                                </td>
                                <td className="px-5">
                                    <div className="flex gap-2">
                                        <button> <FiEye size={25}/> </button>
                                        <button> <LuFilePen size={25}/> </button>
                                        <button> <FiTrash2 size={25} className="text-red-700"/> </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ): tipo === "estudantes" ?(
                <div className="w-full overflow-x-auto">
                    <table className="table-auto min-w-full text-left px-5 bg-branco-100 shadow-md  rounded-lg">
                    <thead className="bg-cinza-300 ">
                        <tr>
                            <th className="py-1 px-5">Estudante</th>
                            <th className="py-1 px-5">Nº Processo</th>
                            <th className="py-1 px-5">Curso</th>
                            <th className="py-1 px-5">Classe</th>
                            <th className="py-1 px-5">Estado</th>
                            <th className="py-1 px-5">Empréstimo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cinza-300">
                        {alunos.map(aluno => (
                            
                            <tr className="hover:bg-cinza-100">
                                <td className="flex items-center gap-5">
                                    <div className="pb-2 pt-2 h-12 w-12 rounded-full bg-laranja-500 text-branco-100 text-center font-bold"> 
                                      <label> {obterIniciais(aluno.estudante)} </label>
                                    </div>
                                    <div className="flex flex-col">
                                        <label> {aluno.estudante} </label>
                                        <label className="text-cinza-900">{aluno.email} </label>
                                    </div>
                                </td>
                                <td className="px-5"> {aluno.n_proc} </td>
                                <td className="px-5"> {aluno.curso} </td>
                                <td className="px-5"> {aluno.classe} </td>
                                <td className="px-5">  
                                    <button className={`px-4 py-2 rounded-lg w-full ${aluno.extra === "Ativo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" }`}>
                                        {aluno.extra}
                                    </button>
                                </td>
                                <td className="px-5">
                                    <button className="px-4 py-2 rounded-lg text-yellow-700 border border-yellow-700"> {aluno.emprestimos} livros </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : tipo === "emprestimos" ?(
                <div className="w-full overflow-x-auto">
                    <table className="table-auto min-w-full text-left px-5 bg-branco-100 shadow-md  rounded-lg">
                    <thead className="bg-cinza-300 ">
                        <tr>
                            <th className="py-1 px-5">Livro</th>
                            <th className="py-1 px-5">Estudante</th>
                            <th className="py-1 px-5">Data Empréstimo</th>
                            <th className="py-1 px-5">Data Vencimento</th>
                            <th className="py-1 px-5">Estado</th>
                            <th className="py-1 px-5">Acções</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cinza-300">
                        {emprestimos.map(emprest => (
                            <tr className="hover:bg-cinza-100">
                                <td className="px-5"> {emprest.livro} </td>
                                <td className="px-5"> {emprest.estudante} </td>
                                <td className="px-5"> {emprest.data_emprestimo} </td>
                                <td className="px-5"> {emprest.data_vencimento} </td>
                                <td className="px-5">  
                                    <button className={`px-4 py-2 rounded-lg w-full ${emprest.estado === "Ativo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" }`}>
                                        {emprest.estado}
                                    </button>
                                </td>
                                <td className="px-5"> {emprest.accoes} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ): tipo === "categorias" ?(
                <div className="w-full overflow-x-auto">
                    <table className="table-auto min-w-full text-left px-5 bg-branco-100 shadow-md  rounded-lg">
                    <thead className="bg-cinza-300 ">
                        <tr>
                            <th className="py-1 px-5">Livro</th>
                            <th className="py-1 px-5">Descrição</th>
                            <th className="py-1 px-5">Nº de Livro</th>
                            <th className="py-1 px-5">Empréstimo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cinza-300">
                        {categorias.map(categoria => (
                            <tr className="hover:bg-cinza-100 ">
                                <td className="flex items-center gap-5 py-3">
                                    <div className="flex items-cente gap-5">
                                        <label className="text-laranja-500"> <HiOutlineFolder size={25}/> </label>
                                        <label className="text-cinza-900">{categoria.categoria} </label>
                                    </div>
                                </td>
                                <td className="px-5 py-3"> {categoria.descricao} </td>
                                <td className="px-5 py-3"> {categoria.n_livros} </td>
                                <td className="px-5 py-3">
                                    <div className="flex gap-2">
                                        <button> <LuFilePen size={25}/> </button>
                                        <button> <FiTrash2 size={25} className="text-red-700"/> </button>
                                    </div>
                                </td>
                                            
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : tipo === "autores" ?(
                                <div className="w-full overflow-x-auto">
                    <table className="table-auto min-w-full text-left px-5 bg-branco-100 shadow-md  rounded-lg">
                    <thead className="bg-cinza-300 ">
                        <tr>
                            <th className="py-1 px-5">Autor</th>
                            <th className="py-1 px-5">Nacionalidade</th>
                            <th className="py-1 px-5">Nº de Livro</th>
                            <th className="py-1 px-5">Empréstimo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cinza-300">
                        {autores.map(autor => (
                            <tr className="hover:bg-cinza-100 ">
                                <td className="flex items-center gap-5 py-3">
                                    <div className="flex items-cente gap-5">
                                        <label className="text-laranja-500"> <MdPersonOutline size={25}/> </label>
                                        <label className="text-cinza-900">{autor.autor} </label>
                                    </div>
                                </td>
                                <td className="px-5 py-3"> {autor.nacionalidade} </td>
                                <td className="px-5 py-3"> {autor.n_livros} </td>
                                <td className="px-5 py-3">
                                    <div className="flex gap-2">
                                        <button> <LuFilePen size={25}/> </button>
                                        <button> <FiTrash2 size={25} className="text-red-700"/> </button>
                                    </div>
                                </td>
                                            
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (
                null
            )}
        </main>
    );
}
export default Table;