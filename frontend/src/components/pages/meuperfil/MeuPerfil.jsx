import CardMeuPerfil from "../../cards/CardMeuPerfil";
import HeaderEmprestimo from "./seccoes/HeaderEmprestimo";
import CardSorteiaEmprestimo from "../../cards/CardSorteiaEmprestimo";
import CardConfiguracoes from "../../cards/CardConfiguracoes";
import HeaderReservas from "./seccoes/HeaderReservas";
import CardSorteiaReserva from "../../cards/CardSorteiaReserva";

function MeuPerfil()
{
    return(
        <main className=" mt-20  flex flex-col p-5 lg:flex-row w-full min-h-screen gap-5 lg:ms-10 me-10 ">
            <section className="mb-60">
                <CardMeuPerfil/>
            </section>
            <section className="flex-1 bg-branco-100"> 
                <div className="mb-32">
                    <HeaderEmprestimo/>
                    <CardSorteiaEmprestimo/>
                </div>
                <div className="mb-48">
                    <HeaderReservas/>
                    <CardSorteiaReserva/>
                </div>
                <div>
                    <CardConfiguracoes/>
                </div>
                    
            </section>
                
        </main>
    );
}
export default MeuPerfil;