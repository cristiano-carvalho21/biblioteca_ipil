import Welcome from "../Welcome";
import CardEventoMaster from "../../cards/CardEventoMaster";
import CardEvento from "../../cards/CardEvento";


function Exposicoes()
{
    return(    
        <main className="mt-10 mb-20 bg-branco-100">
            <Welcome pages="exposicoes"/>
            <section className="grid grid-rows-[auto_auto] grid-cols-1 gap-4 p-4 md:p-10">
                <article className="col-span-1">
                    <CardEventoMaster extra="destaque_master"/>
                </article>
                
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-10">
                <article>
                    <CardEvento estado="Evento" />
                </article>
                <article>
                    <CardEvento estado="Destaque" />
                </article>
            </section>
        </main>
        
    );
}
export default Exposicoes;