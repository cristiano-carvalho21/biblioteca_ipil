function Select({tipo})
{
    return(
        <section>
        {tipo === "categoria" ? (
            <form className="flex flex-col">
                <select name="" id="" className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <option value="">Todas as categórias</option>
                    <option value="1">Tecnologia</option>
                    <option value="2">Ciência</option>
                    <option value="3">Arte</option>
                    <option value="4">Cultura</option>
                    <option value="5">Cultura e História</option>
                    <option value="6">Cultura e Romance</option>
                </select>
            </form>
        ) : tipo === "estado" ?(
            <form className="flex flex-col">
                <select name="" id="" className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <option value="">Todos os Status</option>
                    <option value="1">Disponível</option>
                    <option value="2">Emprestado</option>
                    <option value="3">Reservado</option>
                    <option value="4">Pendente</option>
                </select>
            </form>
        ) : tipo === "todos" ?(
            <form className="flex flex-col">
                <select name="" id="" className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <option value="">Todos</option>
                    <option value="1">Ativos</option>
                    <option value="2">Suspensos</option>
                    <option value="3">Pendentes</option>
                </select>
            </form>
        ) : tipo === "cursos" ?(
            <form className="flex flex-col">
                <select name="" id="" className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <option value="">Todos os cursos</option>
                    <option value="1">IG</option>
                    <option value="2">II</option>
                    <option value="3">MM</option>
                    <option value="4">QA</option>
                </select>
            </form>
        ) : (
            null
        )}

        </section>
    )
}
export default Select;