import HeaderOutle from "../outle/HeaderOutle";
import InputGroup from "../../tags/inputs/InputGroup";
import Select from "../../tags/selects/Select";
import Table from "../../tables/Table";

function GestaoLivros()
{

    return(
        <main className="flex flex-col relative flex-wrap mt-12 space-y-20">
            <section>
                <HeaderOutle page="gestaolivro"/>
            </section>
            <section className="flex items-center gap-10 p-5">
                <InputGroup page="catalogo" type="text" placeholder="Busque por título, autor e categórias" />
                <Select tipo="categoria" />
                <Select tipo="estado" />
            </section>
            <section>
                <Table tipo="gestaolivro"/>
            </section>
        </main>
    );
}
export default GestaoLivros;