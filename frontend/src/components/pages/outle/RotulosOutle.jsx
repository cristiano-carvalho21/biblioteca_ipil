import {alunos, emprestimos} from "../../../data/bd.json";

function RotulosOutle({page})
{
    const alunosAtivos = alunos.filter(aluno => aluno.estado === "Ativo");
    const alunosSuspensos = alunos.filter(aluno => aluno.estado === "Suspenso");
    const alunosEmprestimos = alunos.filter(aluno => aluno.emprestimos !== 0);

    const emprestimosAtivos = emprestimos.filter(emprest => emprest.estado === "Ativo");
    const emprestimosAtrasados = emprestimos.filter(emprest => emprest.estado === "Atrasado");

    return(
        <main>
            {page === "estudantes" ?(
                <section className="flex justify-between md:px-20">
                    <article className="space-y-10 ">
                        <div className="bg-branco-100 w-96 px-8 py-4 h-24 border border-cinza-700 rounded-lg">
                            <p className="text-cinza-900 text-xl">Total de Estudantes</p>
                            <label className="text-laranja-500 font-bold"> {alunos.length} </label>
                        </div>
                        <div className="bg-branco-100 w-96 px-8 py-4 h-24 border border-cinza-700 rounded-lg">
                            <p className="text-cinza-900 text-xl">Ativos</p>
                            <label className="text-green-700 font-bold"> {alunosAtivos.length} </label>
                        </div>
                    </article>
                    <article className="space-y-10 ">
                        <div className="bg-branco-100 w-96 px-8 py-4 h-24 border border-cinza-700 rounded-lg">
                            <p className="text-cinza-900 text-xl">Com Empréstimos</p>
                            <label className="text-blue-700 font-bold"> {alunosEmprestimos.length} </label>
                        </div>
                        <div className="bg-branco-100 w-96 px-8 py-4 h-24 border border-cinza-700 rounded-lg">
                            <p className="text-cinza-900 text-xl">Com Atrasos</p>
                            <label className="text-red-700 font-bold"> {alunosSuspensos.length} </label>
                        </div>
                    </article>
                </section>
            ) : page === "emprestimos" ?(
                <section className="flex justify-between md:px-20 items-center">
                    <article className="space-y-10 ">
                        <div className="bg-branco-100 w-96 px-8 py-4 h-24 border border-cinza-700 rounded-lg">
                            <p className="text-cinza-900 text-xl">Total Ativos</p>
                            <label className="text-laranja-500 font-bold"> {emprestimosAtivos.length} </label>
                        </div>
                        <div className="bg-branco-100 w-96 px-8 py-4 h-24 border border-cinza-700 rounded-lg">
                            <p className="text-cinza-900 text-xl">Atrasados</p>
                            <label className="text-laranja-500 font-bold"> {emprestimosAtrasados.length} </label>
                        </div>
                    </article>
                    <article className="space-y-10">
                        <div className="bg-branco-100 w-96 px-8 py-4 h-24 border border-cinza-700 rounded-lg">
                            <p className="text-cinza-900 text-xl">Devoluções Hoje</p>
                            <label className="text-laranja-500 font-bold"> 0 </label>
                        </div>
                        <div className="bg-branco-100 w-96 px-8 py-4 h-24 border border-cinza-700 rounded-lg">
                            <p className="text-cinza-900 text-xl">Vencimento Próximo</p>
                            <label className="text-laranja-500 font-bold"> 0 </label>
                        </div>
                    </article>
                </section>
            ) : (
                null
            )}
        </main>
    );
}
export default RotulosOutle;