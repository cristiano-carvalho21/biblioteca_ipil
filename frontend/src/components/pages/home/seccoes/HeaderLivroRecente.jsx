function HeaderLivroRecente()
{
    return(
        <section className="flex justify-between p-10 bg-branco-100 mt-20">
            <article>
                <h1 className="font-bold text-lg mb-2">Adicionadas Recentemente</h1>
                <p className="text-sm">Novidade no acervo</p>
            </article>

            <article> 
                <button className="bg-laranja-100 text-laranja-500 p-3 font-bold rounded-lg">Ver exposições</button> 
            </article>
        </section>
    );
}
export default HeaderLivroRecente;