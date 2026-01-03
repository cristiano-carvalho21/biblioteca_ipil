function Select({tipo, value, onChange})
{
    return(
        <section>
        {tipo === "categoria" ? (
            <form className="flex flex-col">
                <select name="" id="" value={value} onChange={onChange} className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <option value="">Todas as categórias</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Ciência">Ciência</option>
                    <option value="Arte">Arte</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Cultura e História">Cultura e História</option>
                    <option value="Cultura e Romance">Cultura e Romance</option>
                </select>
            </form>
        ) : tipo === "estado" ?(
            <form className="flex flex-col">
                <select name="" id="" value={value} onChange={onChange} className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <option value="">Todos os Status</option>
                    <option value="Disponível">Disponível</option>
                    <option value="Emprestado">Emprestado</option>
                    <option value="Reservado">Reservado</option>
                    <option value="Pendente">Pendente</option>
                </select>
            </form>
        ) : tipo === "todos" ?(
            <form className="flex flex-col">
                <select name="" id="" className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <option value="">Todos</option>
                    <option value="Ativos">Ativos</option>
                    <option value="Suspensos">Suspensos</option>
                    <option value="Pendentes">Pendentes</option>
                </select>
            </form>
        ) : tipo === "cursos" ?(
            <form className="flex flex-col">
                <select name="" id="" className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <option value="">Todos os cursos</option>
                    <option value="IG">IG</option>
                    <option value="II">II</option>
                    <option value="MM">MM</option>
                    <option value="QA">QA</option>
                </select>
            </form>
        ) : (
            null
        )}

        </section>
    )
}
export default Select;