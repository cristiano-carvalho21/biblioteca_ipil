import HeaderOutle from "../outle/HeaderOutle";
import Tabs from "../../tabs/Tabs";
import Table from "../../tables/Table";

function CategoriasAutores()
{
    const tabs = [
        {label: "Categórias", content: <Table tipo="categorias" />},
        {label: "Autores", content: <Table tipo="autores" />}
    ]
    return(
        <main className="mt-12 space-y-20">
            <section>
                <HeaderOutle page="categoriasautores" />
            </section>
            <section>
                <article className="flex text-end justify-end">
                    <button className="bg-laranja-500 text-branco-100 px-4 h-10 text-lg  rounded-lg">
                        + Nova Categória
                    </button>
                </article>
                <article className="flex text-center">
                    <Tabs tabs={tabs}/>
                </article>
            </section>
                

        </main>
    );
}
export default CategoriasAutores;