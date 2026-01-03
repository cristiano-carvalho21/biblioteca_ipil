import Welcome from "../Welcome";
import Filtragem from "./seccoes/Filtragem";
import CardLivro from "../../cards/CardLivro";
import {livros} from "../../../data/bd.json"
import { useState } from "react";

function Catalogo()
{
    const [pesquisa, setPesquisa] = useState("");
    const [catSelecionado, setCatSelecionado] = useState("");
    const [estSelecionado, setEstSelecionado] = useState("");
    const totalLivros = livros.length;
    console.log("Categória selecionada é ",catSelecionado);
    console.log("Estado selecionado é ",estSelecionado);

    return(
        <main className="mt-10 w-full h-full">
            <Welcome pages="catalogo"/>
            <Filtragem onPesquisar={setPesquisa} pesquisa={pesquisa} onSelecionarCat={setCatSelecionado} catSelecionado={catSelecionado} onSelecionarEst={setEstSelecionado} estSelecionado={estSelecionado} />
            <section className="  mt-10 bg-branco-100">
                <h2 className="mb-3 p-4">{totalLivros} Livros encontrados</h2>
                <CardLivro pesquisa={pesquisa} catSelecionado={catSelecionado} estSelecionado={estSelecionado} />
            </section>
        </main>
    );
}
export default Catalogo;