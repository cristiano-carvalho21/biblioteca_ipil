function SelectStatus()
{
    return(
        <section>
            <form className="flex flex-col">
                <label className="mb-3">Disponiblidade</label>
                   <select name="" id="" className="border border-cinza-700 w-64 h-10 rounded-lg outline-none relative  focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <option value="">Todos os Status</option>
                        <option value="1">Disponível</option>
                        <option value="2">Emprestado</option>
                        <option value="3">Reservado</option>
                        <option value="4">Pendente</option>
                    </select>
            </form>
        </section>
    );
}
export default SelectStatus;