import Cabecalho from "../casa/cabecalho/cabecalho";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";
import CardExposicoes from "../cards/cardExposicao/CardExposicoes";
import CardEvento from "../cards/cardExposicao/CardEvento";
import Footer from "../casa/footer/footer";

function Exposicao() {
    return (
        <div>
            <Cabecalho/>
            <motion.section  initial={{ opacity: 0, y: 20 }}       // começa invisível e levemente abaixo
                whileInView={{ opacity: 1, y: 0 }}   // anima quando entra na tela
                viewport={{ once: true }}             // anima apenas uma vez
                transition={{ duration: 0.8 }} 
                className="pt-18">
                <article className="flex flex-col bg-linear-to-l from-[#F97B17] to-[#F86417] py-16 px-5 gap-3 text-white">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3"> 
                            <BsStars size={40}/> 
                            <h1 className="text-4xl [#F86417] font-medium">Exposições e Novidades</h1>
                        </div>
                        <p className="text-xl text-white/80">Descubra eventos literários, novos livros e coleções especiais</p>
                    </div>         
                    <div className="mt-10 space-x-2">
                        <Link to="/minhasexposicoes" className="cursor-pointer p-2 px-8 rounded-lg bg-yellow-700 text-white hover:bg-yellow-600 text-white">Minhas exposições</Link>    
                        <Link to="/meuseventos" className="cursor-pointer p-2 px-8 rounded-lg bg-blue-700 text-white hover:bg-blue-600 text-white">Meus eventos</Link>    
                        <Link to="/participacoes" className="cursor-pointer p-2 px-8 rounded-lg bg-green-700 text-white hover:bg-green-600 text-white">Participações</Link>    
                    </div>
                </article>          
            </motion.section>

            <section className="gap-4 py-10 px-5 space-y-10">
                <div>
                    <CardExposicoes/>
                </div>
                <div>
                    <CardEvento/>
                </div>
            </section>

            <section>
                <Footer/>
            </section>

        </div>
    )
}

export default Exposicao;