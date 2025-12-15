import WelcomeCatalogo from "./seccoes/WelcomeCatalogo";
import Filtragem from "./seccoes/Filtragem";
import CardLivro from "../../cards/CardLivro";

function Catalogo()
{
    return(
        <main className="mt-10">
            <WelcomeCatalogo/>
            <Filtragem/>
            <section className="p-5 ms-2 me-2 mt-10 bg-branco-100">
                <h2 className="mb-3">{8} Livros encontrados</h2>
                <article className="flex flex-wrap gap-20 ms-5">
                    <CardLivro/>
                </article>
            </section>
        </main>
    );
}
export default Catalogo;