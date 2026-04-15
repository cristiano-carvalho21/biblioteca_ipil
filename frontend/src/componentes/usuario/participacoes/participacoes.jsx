import Cabecalho from "../casa/cabecalho/cabecalho";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../../service/api/api";

function Participacoes()
{
    const [participacoes, setParticipacoes] = useState([]);
    const [loading, setLoading] = useState(false);

    const carregar = async () => {
        try {
            const res = await api.get("/livros/participacoes/");
            setParticipacoes(Array.isArray(res.data.results) ? res.data.results : res.data);
        } catch (error) {
            alert("Erro na captura de participações", error)
        }
        setLoading(false);
    }

    useEffect(() => {
        carregar();
    }, []);

    if(loading) return <p>Carregando...</p>


    return(
        <div>
            <Cabecalho/>
            <motion.main initial={{ opacity: 0, y: 20 }}       // começa invisível e levemente abaixo
                whileInView={{ opacity: 1, y: 0 }}   // anima quando entra na tela
                viewport={{ once: true }}             // anima apenas uma vez
                transition={{ duration: 0.8 }} >

                <div className="pt-32 px-5 h-52 flex flex-col items-start justify-center">
                    <h4 className="text-4xl">Participações</h4>
                    <p className="pt-2 text-xl text-[#000000]/57">Exposições e Eventos participados</p>
                </div>
                <div className="w-[75%] bg-white rounded-2xl px-8 my-25 py-8">
                <table className="w-full table-fixed border-collapse bg-white shadow-md rounded-xl overflow-hidden">
                    <thead className="bg-black/5">
                        <tr>
                            <th className="w-[30%] px-5 py-3 text-center">Tipo de Atividade</th>
                            <th  className="w-[40%] px-5 py-3 text-center">Tema</th>
                            <th className="w-[30%] px-5 py-3 text-center">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                        {Array.isArray(participacoes) && participacoes.length === 0 ?(
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-red-700">
                                    Nenhuma participação encontrada.
                                </td>
                            </tr>
                        ) : (Array.isArray(participacoes) && participacoes.map(part => (
                            <tr className="hover:bg-black/3" key={part.id}>
                                <td className="flex items-center gap-5 px-5 py-4 truncate text-center text-black/85">
                                    {part.exposicao ? "Exposição" : "Evento"}
                                </td>
                                <td className="px-5 py-4 truncate text-center text-black/85"> {part.exposicao ? part.exposicao?.titulo : part.evento?.titulo} </td>
                                <td className="px-5 py-4 truncate text-center text-black/85"> {part.data_registro} </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>

            </motion.main>
        </div>
    );
}

export default Participacoes;