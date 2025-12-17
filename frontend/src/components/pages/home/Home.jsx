import Welcome from "./seccoes/Welcome";
import Rotulos from "./seccoes/Rotulos";
import CardLivro from "../../cards/CardLivro";
import HeaderLivroPopular from "./seccoes/HeaderLivroPopular";
import HeaderLivroRecente from "./seccoes/HeaderLivroRecente";


function Home()
{
    return(
        <main className="h-full w-full">
            <Welcome/>
            <Rotulos/>
            <HeaderLivroPopular/>
            <CardLivro tipo="popular"/>
            <HeaderLivroRecente/>
            <CardLivro tipo="recente" />
            <section className="mb-20 mt-20 text-center">
                <h1>Biblioteca IPIL</h1>
            </section>

        </main>
    );
}
export default Home;