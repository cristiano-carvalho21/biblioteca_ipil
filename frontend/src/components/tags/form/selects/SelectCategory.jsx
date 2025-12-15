function SelectCategory()
{
    return(
        <section>
            <form className="flex flex-col">
                <label className="mb-3 ">Categória</label>
                <select name="" id="" className="border border-cinza-700 w-64 h-10 rounded-lg">
                    <option value="">Todas as categórias</option>
                    <option value="1">Tecnologia</option>
                    <option value="2">Ciência</option>
                    <option value="3">Arte</option>
                    <option value="4">Cultura</option>
                    <option value="5">Cultura e História</option>
                    <option value="6">Cultura e Romance</option>
                </select>
            </form>
        </section>
    )
}
export default SelectCategory;