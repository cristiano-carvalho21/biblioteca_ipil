import Form from "../../../tags/form/Form";

function Welcome()
{
    return(
        
        <section className="bg-laranja-500 h-96">
            
            <article className="text-branco-100 p-10">
                <h1 className="pt-5 text-4xl">Bem-vindo à Biblioteca IPIL</h1>
                <p className="pt-3 text-xl">Explore o nosso acervo digtal e reserve seus livros favoritos com apenas alguns cliques</p>
            </article>
                             
                <article className="ms-10">
                <Form/>
                </article>
                            
            
        </section>
        
    );
}
export default Welcome;