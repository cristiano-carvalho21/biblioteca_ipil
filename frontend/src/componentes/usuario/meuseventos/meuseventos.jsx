import Cabecalho from "../casa/cabecalho/cabecalho";
import { motion } from "framer-motion";

function MeusEventos()
{
    return(
        <div>
            <Cabecalho/>
            <motion.main initial={{ opacity: 0, y: 20 }}       // começa invisível e levemente abaixo
                whileInView={{ opacity: 1, y: 0 }}   // anima quando entra na tela
                viewport={{ once: true }}             // anima apenas uma vez
                transition={{ duration: 0.8 }} >

                <div className="pt-32 px-5 h-52 flex flex-col items-start justify-center">
                    <h4 className="text-4xl">Meus Eventos</h4>
                    <p className="pt-2 text-xl text-[#000000]/57">Eventos do meu gosto</p>
                </div>
            </motion.main>
        </div>
    );
}

export default MeusEventos;