import HeaderOutle from "../outle/HeaderOutle";
import RotulosOutle from "../outle/RotulosOutle";
import InputGroup from "../../tags/inputs/InputGroup";
import Select from "../../tags/selects/Select";
import Table from "../../tables/Table";

function Emprestimos()
{
    return(
        <main className="mt-12 space-y-20">
            <section>
                <HeaderOutle page="emprestimos" />
            </section>
            <section>
                <RotulosOutle page="emprestimos" />
            </section>
            <section className="flex items-center gap-10 p-5">
                <InputGroup page="catalogo" type="text" placeholder="Pesquisar..." />
                <Select tipo="todos" />
            </section>
            <section>
                <Table tipo="emprestimos" />
            </section>
        </main>
    );
}
export default Emprestimos;