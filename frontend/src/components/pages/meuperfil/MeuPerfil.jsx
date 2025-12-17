import CardMeuPerfil from "../../cards/CardMeuPerfil";
import HeaderEmprestimo from "./seccoes/HeaderEmprestimo";
import CardSorteiaEmprestimo from "../../cards/CardSorteiaEmprestimo";
import CardConfiguracoes from "../../cards/CardConfiguracoes";
import HeaderReservas from "./seccoes/HeaderReservas";
import CardSorteiaReserva from "../../cards/CardSorteiaReserva";

function MeuPerfil()
{
    return(
        <main className="ms-10 me-10 mt-20 grid grid-cols-[auto_1fr] w-full h-full gap-5">
            <section>
                <CardMeuPerfil/>
            </section>
            <section className="bg-branco-100">
                <HeaderEmprestimo/>
                <CardSorteiaEmprestimo/>
                <HeaderReservas/>
                <CardSorteiaReserva/>
                <CardConfiguracoes/>
                
            </section>
                
        </main>
    );
}
export default MeuPerfil;