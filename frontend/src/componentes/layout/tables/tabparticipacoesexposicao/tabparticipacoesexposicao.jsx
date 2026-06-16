import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../service/api/api";
import { motion } from "framer-motion";
import Skeleton from "../../../layout/motion/skeleton/skeleton";
import Toast from "../../../usuario/stylenotificacao/toast";

function TabelaParticipacoesExposicao() {
    const { id } = useParams();

    const [participacoes, setParticipacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({
        message: "",
        type: null,
    });

    const carregarParticipacoes = async () => {
        try {
            const res = await api.get(
                `/livros/gestao-exposicoes/${id}/participacoes/`
            );

            setParticipacoes(res.data);
        } catch (error) {
            setToast({
                message: "Erro ao carregar participações",
                type: "error",
            });

            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        carregarParticipacoes();
    }, [id]);

    if (loading) return <Skeleton type="card" count={5} />;

    if (!participacoes.length)
        return (
            <p className="text-center text-red-600 mt-50">
                Nenhuma participação encontrada.
            </p>
        );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl px-8 py-6 mt-20"
        >
            <h2 className="text-xl font-semibold mb-5">
                Participações da Exposição {participacoes.exposicao}
            </h2>

            <table className="w-full table-fixed border-collapse">
                <thead className="bg-black/5">
                    <tr>
                        <th className="px-5 py-3 text-center">Nome</th>
                        <th className="px-5 py-3 text-center">Usuário</th>
                        <th className="w-[15%] px-5 py-3 text-center">Curso</th>
                        <th className="w-[10%] px-5 py-3 text-center">Classe</th>
                        <th className="px-5 py-3 text-center">Data</th>
                        <th className="px-5 py-3 text-center">Estado</th>
                    </tr>
                </thead>

                <tbody>
                    {participacoes.map((item) => (
                        <tr key={item.id} className="hover:bg-black/5">

                            <td className="px-5 py-4 text-center">
                                {item.usuario}
                            </td>

                            <td className="px-5 py-4 text-center">
                                {item.usuario_username}
                            </td>

                            <td className="px-5 py-4 text-center">
                                {item.curso}
                            </td>

                            <td className="px-5 py-4 text-center">
                                {item.classe}
                            </td>

                            <td className="px-5 py-4 text-center">
                                {item.data_participacao
                                    ? new Date(
                                          item.data_participacao
                                      ).toLocaleDateString()
                                    : "-"}
                            </td>

                            <td className="px-5 py-4 text-center">
                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                                    {item.estado}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </motion.div>
    );
}

export default TabelaParticipacoesExposicao;