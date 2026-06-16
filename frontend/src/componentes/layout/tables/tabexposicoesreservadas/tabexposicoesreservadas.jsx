import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

import api from "../../../service/api/api";
import { useAuth } from "../../../auth/userAuth/useauth";

function TabelaExposicoesReservadas() {

    const { user } = useAuth();

    const userRoles = user?.user?.grupos || [];

    const isAdmin =
        user?.user?.is_superuser ||
        userRoles.includes("Admin") ||
        userRoles.includes("Bibliotecario");

    const [reservas, setReservas] = useState([]);
    const [idDestacado, setIdDestacado] = useState(null);

    const [search, setSearch] = useState("");
    const [estadoFilter, setEstadoFilter] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    // ==========================
    // STATUS UI
    // ==========================
    const statusConf = {
        Reservado: {
            label: "Reservado",
            style: "bg-orange-100 text-orange-700 border-orange-200",
        },
        Aprovado: {
            label: "Aprovado",
            style: "bg-blue-100 text-blue-700 border-blue-200",
        },
        Participado: {
            label: "Participado",
            style: "bg-green-100 text-green-700 border-green-200",
        },
        Cancelado: {
            label: "Cancelado",
            style: "bg-red-100 text-red-700 border-red-200",
        },
    };

    // ==========================
    // FETCH
    // ==========================
    const fetchReservas = useCallback(async () => {
        try {

            const res = await api.get("livros/reservadas/", {
                params: {
                    search,
                    estado: estadoFilter
                }
            });

            const data = Array.isArray(res.data.results)
                ? res.data.results
                : res.data;

            setReservas(data);

        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                navigate("/login");
            }
        }
    }, [search, estadoFilter, navigate]);

    useEffect(() => {
        fetchReservas();
    }, [fetchReservas]);

    // ==========================
    // ALTERAR ESTADO
    // ==========================
    const alterarEstadoReserva = async (id, novoEstado) => {

    try {

        let endpoint = "";

        if (novoEstado === "Aprovado") {
            endpoint = `livros/reservadas/${id}/aprovar/`;
        }

        else if (novoEstado === "Participado") {
            endpoint = `livros/reservadas/${id}/participar/`;
        }

        else if (novoEstado === "Cancelado") {
            endpoint = `livros/reservadas/${id}/cancelar/`;
        }

        await api.post(endpoint);

        fetchReservas();

    } catch (err) {

        const mensagem =
            err.response?.data?.message ||
            "Erro ao atualizar estado.";

        alert(mensagem);

        console.error(err);
    }
};

    // ==========================
    // REGRAS DE AÇÃO
    // ==========================

    const renderAcoes = (reserva) => {

        if (!isAdmin) return <span className="text-gray-500">—</span>;

        return (
            <div className="flex items-center justify-center gap-2">

                {/* APROVAR (só se estiver Reservado) */}
                {reserva.estado === "Reservado" && (
                    <button
                        onClick={() =>
                            alterarEstadoReserva(reserva.id, "Aprovado")
                        }
                        className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200"
                    >
                        Aprovar
                    </button>
                )}

                {/* PARTICIPAR (só se estiver Aprovado) */}
                {reserva.estado === "Aprovado" && (
                    <button
                        onClick={() =>
                            alterarEstadoReserva(reserva.id, "Participado")
                        }
                        className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
                    >
                        Participou
                    </button>
                )}

                {/* CANCELAR (exceto cancelado/participado) */}
                {reserva.estado !== "Cancelado" &&
                 reserva.estado !== "Participado" && (
                    <button
                        onClick={() =>
                            alterarEstadoReserva(reserva.id, "Cancelado")
                        }
                        className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
                    >
                        Cancelar
                    </button>
                )}

            </div>
        );
    };

    // ==========================
    // RENDER
    // ==========================
    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-10 pt-30"
        >

            {/* FILTROS */}
            <section className="flex items-center justify-center gap-8 bg-white px-5 py-8 border border-black/5 rounded-2xl flex-col md:flex-row">

                <div className="w-full">
                    <div className="flex items-center bg-black/5 border rounded-xl overflow-hiddenmax-w-md text-[#000000]/57
                        relative focus-within:ring-2 focus-within:ring-[#f97b17] border-[#E6E6E6] transition
                    ">
                        <button className="h-full rounded-l-lg px-2 py-1.5 hover:text-[#f97b17] transition cursor-pointer"> <FiSearch size={22}/> </button>
        
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" 
                        placeholder="Busque por título, isbn, estado e categoria" className="flex-1 px-4 py-1.5 outline-none"/>
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-64">

                    <select
                        value={estadoFilter}
                        onChange={(e) => setEstadoFilter(e.target.value)}
                        className="
                        w-full
                        px-3
                        h-10
                        rounded-xl cursor-pointer
                        border border-black/10
                        bg-white
                        text-sm
                        focus:ring-2 focus:ring-[#f97b17]
                        outline-none
                        "
                    >
                        <option value="">Todos</option>
                        <option value="Reservado">Reservado</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Participado">Participado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
            </section>

            {/* TABELA */}
            <section className="bg-white rounded-2xl px-8 py-5">

                <h2 className="text-xl font-medium">
                    Lista de Reservas
                </h2>

                <table className="w-full table-fixed border-collapse mt-5">

                    <thead className="bg-black/5">
                        <tr>
                            <th className="px-5 py-3 text-center">Exposição</th>
                            <th className="px-5 py-3 text-center">Nome</th>
                            <th className="px-5 py-3 text-center">Usuário</th>
                            <th className="px-5 py-3 text-center">Curso</th>
                            <th className="px-5 py-3 text-center">Classe</th>
                            <th className="px-5 py-3 text-center">Data</th>
                            <th className="px-5 py-3 text-center">Estado</th>
                            <th className="px-5 py-3 text-center">Ações</th>
                        </tr>
                    </thead>

                    <tbody>

                        {reservas.map((reserva) => {

                            const config =
                                statusConf[reserva.estado] || {
                                    label: reserva.estado,
                                    style: "bg-gray-100 text-gray-700 border-gray-200",
                                };

                            return (
                                <tr key={reserva.id} className="hover:bg-gray-100">

                                    <td className="px-5 py-4 text-center">
                                        {reserva.exposicao}
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        {reserva.usuario}
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        {reserva.usuario_username}
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        {reserva.curso}
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        {reserva.classe}
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        {new Date(reserva.data_reserva).toLocaleDateString()}
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-sm border ${config.style}`}>
                                            {config.label}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        {renderAcoes(reserva)}
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </section>

        </motion.main>
    );
}

export default TabelaExposicoesReservadas;