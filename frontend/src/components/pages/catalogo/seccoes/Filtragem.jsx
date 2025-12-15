import InputGroupNone from "../../../tags/form/inputs/InputGroupNone";
import SelectCategory from "../../../tags/form/selects/SelectCategory";
import SelectStatus from "../../../tags/form/selects/SelectStatus";

function Filtragem()
{
    return(
        <section className="p-5 bg-branco-100">  
            <article className="mb-5">
                <form action="">
                    <InputGroupNone type="text" placeholder="Busca por título, autor ou categória" />
                </form>
            </article>

            <article>
                <button className="text-laranja-500 text-sm ms-2">
                    <p>Ocultar Filtros</p>
                </button>
                <div className="flex justify-between ms-2 me-2 mt-5"> 
                    <SelectCategory/>
                    <SelectStatus/>
                </div>
            </article>
        </section>
    );
}
export default Filtragem;