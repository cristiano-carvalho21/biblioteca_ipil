import CardReservas from "../../cards/CardReservas";
import WelcomeReservas from "./WelcomeReservas";

function Reservas()
{
    return(
        <main className="mt-20 mb-20 bg-branco-100 p-5 h-full">
            <section className="ms-10">
                <WelcomeReservas/>
            </section>
            <section className="ms-20">
                    <CardReservas estado="Pendente"/>
                    <CardReservas estado="Reservado"/>
            </section>

            {/*
            <section className="flex mb-20">
                <button className="bg-laranja-500 text-branco-100 px-10 p-2 mx-auto rounded-lg">Ver Mais</button>
            </section>
            */ }

        </main>
    );
}
export default Reservas;