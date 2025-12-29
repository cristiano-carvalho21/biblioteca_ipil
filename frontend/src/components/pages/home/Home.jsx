import Welcome from "../Welcome";
import Rotulos from "./seccoes/Rotulos";
import CardLivro from "../../cards/CardLivro";
import HeaderCardItem from "./seccoes/HeaderCardItem";

function Home()
{
    return(
        <main className="h-full w-full">
            <Welcome pages="home"/>
            <Rotulos/>
            <HeaderCardItem variant="popular" />
            <CardLivro tipo="popular"/>
            <HeaderCardItem variant="recente" />
            <CardLivro tipo="recente" />
            <section className="mb-20 mt-20 text-center">
                <h1>Biblioteca IPIL</h1>
            </section>

        </main>
    );
}
export default Home;