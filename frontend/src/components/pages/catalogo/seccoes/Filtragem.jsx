import InputGroup from "../../../tags/inputs/InputGroup";
import Select from "../../../tags/selects/Select";

function Filtragem()
{
    return(
        <section className="p-5 bg-branco-100">  
            <article className="mb-5">
                    <InputGroup page="catalogo" type="text" placeholder="Busca por título, autor ou categória" />
            </article>
            <article>
                <button className="text-laranja-500 text-sm ms-2">
                    <p>Ocultar Filtros</p>
                </button>
                <div className="flex justify-between ms-2 me-2 mt-5 sm:flex-row"> 
                    <div className="space-y-2"> 
                        <label className="mb-3 ">Categória</label>
                        <Select tipo="categoria" />
                    </div>
                    <div className="space-y-2">
                        <label className="mb-3">Disponiblidade</label>
                        <Select tipo="estado" />
                    </div>

                </div>
            </article>
        </section>
    );
}
export default Filtragem;