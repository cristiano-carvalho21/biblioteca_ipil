import InputGroup from "../../../tags/inputs/InputGroup";
import Select from "../../../tags/selects/Select";

function Filtragem({onPesquisar, pesquisa, onSelecionarCat, catSelecionado, onSelecionarEst, estSelecionado})
{
    return(
        <section className="p-5 bg-branco-100">  
            <article className="mb-5">
                    <InputGroup page="catalogo" type="text" placeholder="Busca por título, autor ou categória" value={pesquisa} onChange={(e) => onPesquisar(e.target.value)} />
            </article>
            <article>
                <button className="text-laranja-500 text-sm ms-2">
                    <p>Ocultar Filtros</p>
                </button>
                <div className="flex flex-col justify-between ms-2 me-2 mt-5 sm:flex-row"> 
                    <div className="space-y-2 mb-2"> 
                        <label className="mb-3 ">Categória</label>
                        <Select tipo="categoria" value={catSelecionado} onChange={(e) => onSelecionarCat(e.target.value) }/>
                    </div>
                    <div className="space-y-2 mb-2">
                        <label className="mb-3">Disponiblidade</label>
                        <Select tipo="estado" value={estSelecionado} onChange={(e) => onSelecionarEst(e.target.value) } />
                    </div>

                </div>
            </article>
        </section>
    );
}
export default Filtragem;