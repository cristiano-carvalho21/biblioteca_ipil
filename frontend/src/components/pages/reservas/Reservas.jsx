import CardReservas from "../../cards/CardReservas";

function Reservas()
{
    return(
        <main className="mt-20 mb-20 bg-branco-100 p-5 h-screen">

            <section className="ms-10">
                <article>
                    <h1 className="text-3xl mb-3">Minhas Reservas</h1>
                    <p className="text-cinza-900">Gerencie suas reservas e empréstimos</p>
                </article>
                <article className="mt-10 mb-10">
                    <p>Reservas Ativas</p>
                </article>
            </section>
                
            <section className="ms-20">
                <article>
                    <CardReservas/>
                </article>
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