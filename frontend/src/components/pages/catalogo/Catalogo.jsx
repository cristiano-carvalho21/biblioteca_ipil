import Welcome from "../Welcome";
import Filtragem from "./seccoes/Filtragem";
import CardLivro from "../../cards/CardLivro";
import {livros} from "../../../data/bd.json"

function Catalogo()
{
    const totalLivros = livros.length;
    return(
        <main className="mt-10 w-full h-full">
            <Welcome pages="catalogo"/>
            <Filtragem/>
            <section className="  mt-10 bg-branco-100">
                <h2 className="mb-3 p-4">{totalLivros} Livros encontrados</h2>
                <CardLivro/>
            </section>
        </main>
    );
}
export default Catalogo;