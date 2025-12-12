import CardMeuPerfil from "../../cards/CardMeuPerfil";
import CardLivrosEmprestados from "../../cards/CardLivrosEmprestados";
import CardLivrosReservados from "../../cards/CardLivrosReservados";
import CardConfiguracoes from "../../cards/CardConfiguracoes";

function MeuPerfil()
{
    return(
        <main className="ms-10 me-10 mt-20 grid grid-cols-[auto_1fr] w-full h-full gap-5">
            <section>
                <CardMeuPerfil />
            </section>
            <section className="bg-branco-100 space-y-5">
                <CardLivrosEmprestados  />
                <CardLivrosReservados  />
                <CardConfiguracoes  />
            </section>
                
        </main>
    );
}
export default MeuPerfil;