import InputGroupNone from "../../tags/form/inputs/InputGroupNone";
import CardLivro from "../../cards/CardLivro";

function Catalogo()
{
    return(
        <main className="mt-10">

            <section>
                <article className="bg-cinza-100 p-5 h-40 mb-7">
                    <h1 className="mt-5 text-2xl mb-1">Catálogo de Livros</h1>
                    <p>Explore nosso acervo completo</p>
                </article>
            </section>

            <section className="p-5 bg-branco-100">
                
                <article className="mb-5">
                    <form action="">
                        <InputGroupNone type="text" placeholder="Busca por título, autor ou categória" />
                    </form>
                </article>

                <article>

                    <button className="text-laranja-500 text-sm ms-2">
                        <p>Ocultar Filtros</p>
                    </button>

                    <div className="flex justify-between ms-2 me-2 mt-5"> 

                        <div>
                            <p className="mb-3 ">Categória</p>
                            <select name="" id="" className="border border-cinza-500 w-64 h-10 ">
                                <option value="">Todas as categórias</option>
                                <option value="1">Tecnologia</option>
                                <option value="2">Ciência</option>
                                <option value="3">Arte</option>
                                <option value="4">Cultura</option>
                                <option value="5">Cultura e História</option>
                                <option value="6">Cultura e Romance</option>
                            </select>
                        </div>

                        <div>
                            <p className="mb-3 ">Disponiblidade</p>
                            <select name="" id="" className="border border-cinza-500 w-64 h-10">
                                <option value="">Todos os Status</option>
                                <option value="1">Disponível</option>
                                <option value="2">Emprestado</option>
                                <option value="3">Reservado</option>
                                <option value="4">Pendente</option>
                            </select>
                        </div>

                    </div>
                </article>
            </section>

            <section className="p-5 ms-2 me-2 mt-10 bg-branco-100">
                <h2 className="mb-3">{8} Livros encontrados</h2>
                <article className="flex flex-wrap gap-20 ms-5">
                    <CardLivro/>
                </article>
            </section>

        </main>
    );
}
export default Catalogo;