import HeaderOutle from "../outle/HeaderOutle";
import RotulosOutle from "../outle/RotulosOutle";
import InputGroup from "../../tags/inputs/InputGroup";
import Select from "../../tags/selects/Select";
import Table from "../../tables/Table";

function Estudantes()
{
    return(
        <main className=" mt-12 space-y-20">
            <section>
                <HeaderOutle page="estudantes" />
            </section>
            <section>
                <RotulosOutle page="estudantes" />
            </section>
            <section className="flex items-center gap-10 p-5">
                <InputGroup page="catalogo" type="text" placeholder="Busque por nome, classe e curso" />
                <Select tipo="todos" />
                <Select tipo="cursos" />
            </section>
            <section>
                <Table tipo="estudantes" />
            </section>
        </main>
    );
}
export default Estudantes;