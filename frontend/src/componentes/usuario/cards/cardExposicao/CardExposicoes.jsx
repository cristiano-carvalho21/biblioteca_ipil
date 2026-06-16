// import { LuClock, LuStar } from "react-icons/lu";
// import { IoCalendarClearOutline } from "react-icons/io5";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import api from "../../../service/api/api";
// import { useAuth } from "../../../auth/userAuth/useauth";
// import Skeleton from "../../../layout/motion/skeleton/skeleton";
// import Toast from "../../stylenotificacao/toast";

// function CardExposicoes() {
//     const { user } = useAuth();
//     const [exposicoes, setExposicoes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [toast, setToast] = useState({
//         message:"",
//         type:null
//     });
//     const isLoading = loading;

   

//     // =========================
//     // FORMATADORES
//     // =========================
//     const formatDate = (datetime) => {
//         return new Date(datetime).toLocaleDateString("pt-PT");
//     };

//     const formatTime = (datetime) => {
//         return new Date(datetime).toLocaleTimeString("pt-PT", {
//             hour: "2-digit",
//             minute: "2-digit",
//         });
//     };

//     // =========================
//     // CARREGAR EXPOSIÇÕES
//     // =========================
//     const carregarExposicoes = async () => {
//         try {
//             const res = await api.get("/livros/exposicoes/");
//             setExposicoes(res.data);
            
//         } catch (error) {
//             setToast({
//                 message: "Erro na captura" + error,
//                 type: "error",
//             });

//             console.log("Erro:", error);
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         carregarExposicoes();
//     }, []);

//     // =========================
//     // RESERVA
//     // =========================
//     const reservar = async (id) => {
//         try {
//             await api.post(`/livros/gestao-exposicoes/${id}/reservar/`);

//             setToast({
//                 message: "Reserva realizada com sucesso!",
//                 type: "success",
//             });
            
//             await carregarExposicoes();
//             console.log("Reserva realizada com sucesso!");
//         } catch (error) {
//             const erros = Object.values(error.response?.data || {})
//                 .flat()
//                 .join(" ");

//             setToast({
//                 message: erros || "Erro ao comunicar com o servidor",
//                 type: "error",
//             });

//             console.log("Erro:",erros);
//         }
//     };

  

//     if (exposicoes){
//         if (loading) {
//             return <Skeleton type="card" count={8} />;
//       }
//     }
    
//     if (!exposicoes) return <p className="text-red-600 text-center mt-20">Nenhuma exposição encontrada.</p>;

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//         >
//             {exposicoes.map((expo) => {

//                 return (
//                     <div key={expo.id} className="flex flex-col w-full relative">

//                         {/* =========================
//                             IMAGEM + BADGE
//                         ========================= */}
//                         <div className="relative w-full">
//                             <img
//                                 src={expo.capa}
//                                 alt="Imagem"
//                                 className="w-full transition-transform duration-300 hover:brightness-110 max-h-72"
//                                 loading="lazy"
//                             />

//                             {/* BADGE ESTADO */}
//                             <span
//                                 className={`absolute top-4 left-4 px-4 py-1 rounded-2xl text-sm font-semibold ${
//                                     expo.estado === "Disponível"
//                                         ? "bg-green-100 text-green-600"
//                                         : "bg-red-100 text-red-600"
//                                 }`}
//                             >
//                                 {expo.estado}
//                             </span>
//                         </div>

//                         {/* =========================
//                             CONTEÚDO
//                         ========================= */}
//                         <div className="flex flex-col gap-1 py-5 px-5">
//                             <h1 className="text-2xl">{expo.titulo}</h1>

//                             <p className="text-black/60">{expo.descricao}</p>

//                             {/* =========================
//                                 DATA + HORA SEPARADAS
//                             ========================= */}
//                             <div className="flex flex-col mt-2 gap-1">

//                                 <div className="flex items-center gap-2 text-black/80">
//                                     <IoCalendarClearOutline size={18} />
//                                     <p>
//                                          {formatDate(expo.data_inicio)} - {formatDate(expo.data_fim)}
//                                     </p>
//                                 </div>

//                                 <div className="flex items-center gap-2 text-black/70">
//                                     🕒
//                                     <p>
//                                          {formatTime(expo.data_inicio)} - {formatTime(expo.data_fim)}
//                                     </p>
//                                 </div>

//                                 <div className="flex items-center gap-2 text-black/70">
//                                     <LuClock size={18} />
//                                     <p>{expo.local}</p>
//                                 </div>
//                             </div>
                                
//                             {/* =========================
//                                 BOTÕES
//                             ========================= */}
//                             <div className="flex gap-4 py-3">
//                                 {expo.estado === "Disponível" ?(
//                                     <button
//                                         onClick={() => reservar(expo.id)}
//                                         className="text-white px-6 py-2 rounded-lg bg-[#F97B27] cursor-pointer hover:bg-[#F86417]"
//                                     >
//                                         Participar
//                                     </button>
//                                 ) : expo.estado === "Esgotado" ?(
//                                     <button
//                                         disabled
//                                         className="text-white px-6 py-2 rounded-lg bg-gray-400 cursor-not-allowed"
//                                     >
//                                         Esgotado
//                                     </button>
//                                 ) : (
//                                     <button
//                                         disabled
//                                         className="text-white px-6 py-2 rounded-lg bg-gray-400 cursor-not-allowed"
//                                     >
//                                         Reservado
//                                     </button>
//                                 )}

//                                 <button className="cursor-pointer px-6 py-2 border border-black/30 rounded-lg hover:bg-black/30 hover:text-white">
//                                     Ver Mais
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}

//             {/* 
//             =========================
//                        TOAST
//             ========================= 
//             */}
//             {toast && (
//                 <Toast
//                 message={toast.message}
//                 type={toast.type}
//                 onClose={() => setToast(null)}
//                 />
//             )}
//         </motion.div>
//     );
// }

// export default CardExposicoes;

import { LuClock } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../../service/api/api";
import { useAuth } from "../../../auth/userAuth/useauth";
import Skeleton from "../../../layout/motion/skeleton/skeleton";
import Toast from "../../stylenotificacao/toast";

function CardExposicoes() {

    const { user } = useAuth();

    const [exposicoes, setExposicoes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({
        message: "",
        type: null
    });

    // =========================
    // FORMATADORES
    // =========================

    const formatDate = (datetime) => {

        return new Date(datetime)
            .toLocaleDateString("pt-PT");
    };

    const formatTime = (datetime) => {

        return new Date(datetime)
            .toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit",
            });
    };

    // =========================
    // CARREGAR EXPOSIÇÕES
    // =========================

    const carregarExposicoes = async () => {

        try {

            const res = await api.get(
                "/livros/exposicoes/"
            );

            const data = Array.isArray(res.data.results)
                ? res.data.results
                : res.data;

            setExposicoes(data);

        } catch (error) {

            setToast({
                message: "Erro ao carregar exposições",
                type: "error",
            });

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        carregarExposicoes();

    }, []);

    // =========================
    // RESERVAR
    // =========================

    const reservar = async (id) => {

        try {

            await api.post(
                `/livros/gestao-exposicoes/${id}/reservar/`
            );

            setToast({
                message: "Reserva realizada com sucesso!",
                type: "success",
            });

            await carregarExposicoes();

        } catch (error) {

            const erros = Object.values(
                error.response?.data || {}
            )
                .flat()
                .join(" ");

            setToast({
                message:
                    erros ||
                    "Erro ao comunicar com o servidor",
                type: "error",
            });

            console.log(error);
        }
    };

    // =========================
    // STATUS UI
    // =========================

    const getStatusConfig = (expo) => {

        switch (expo.estado) {

            case "Disponível":
                return {
                    label: "Disponível",
                    badge:
                        "bg-green-100 text-green-600",
                    button: (
                        <button
                            onClick={() =>
                                reservar(expo.id)
                            }
                            className="
                                text-white px-6 py-2 rounded-lg
                                bg-[#F97B27] cursor-pointer
                                hover:bg-[#F86417]
                            "
                        >
                            Participar
                        </button>
                    )
                };

            case "Reservado":
                return {
                    label: "Reservado",
                    badge:
                        "bg-orange-100 text-orange-700",
                    button: (
                        <button
                            disabled
                            className="
                                text-white px-6 py-2 rounded-lg
                                bg-orange-400
                                cursor-not-allowed
                            "
                        >
                            Reservado
                        </button>
                    )
                };

            case "Aprovado":
                return {
                    label: "Aprovado",
                    badge:
                        "bg-blue-100 text-blue-700",
                    button: (
                        <button
                            disabled
                            className="
                                text-white px-6 py-2 rounded-lg
                                bg-blue-500
                                cursor-not-allowed
                            "
                        >
                            Aprovado
                        </button>
                    )
                };

            case "Participado":
                return {
                    label: "Participado",
                    badge:
                        "bg-purple-100 text-purple-700",
                    button: (
                        <button
                            disabled
                            className="
                                text-white px-6 py-2 rounded-lg
                                bg-purple-500
                                cursor-not-allowed
                            "
                        >
                            Participado
                        </button>
                    )
                };

            case "Esgotado":
                return {
                    label: "Esgotado",
                    badge:
                        "bg-red-100 text-red-600",
                    button: (
                        <button
                            disabled
                            className="
                                text-white px-6 py-2 rounded-lg
                                bg-gray-400
                                cursor-not-allowed
                            "
                        >
                            Esgotado
                        </button>
                    )
                };

            default:
                return {
                    label: "Indefinido",
                    badge:
                        "bg-gray-100 text-gray-600",
                    button: (
                        <button
                            disabled
                            className="
                                text-white px-6 py-2 rounded-lg
                                bg-gray-400
                                cursor-not-allowed
                            "
                        >
                            Indefinido
                        </button>
                    )
                };
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <Skeleton
                type="card"
                count={8}
            />
        );
    }

    // =========================
    // SEM DADOS
    // =========================

    if (!exposicoes.length) {

        return (
            <p className="
                text-red-600 text-center mt-20
            ">
                Nenhuma exposição encontrada.
            </p>
        );
    }

    // =========================
    // RENDER
    // =========================

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
                grid grid-cols-1 sm:grid-cols-2
                md:grid-cols-3 lg:grid-cols-4
                gap-6
            "
        >

            {exposicoes.map((expo) => {

                const status =
                    getStatusConfig(expo);

                return (

                    <div
                        key={expo.id}
                        className="
                            flex flex-col
                            w-full relative
                        "
                    >

                        {/* =========================
                            IMAGEM + BADGE
                        ========================= */}

                        <div className="
                            relative w-full
                        ">

                            <img
                                src={expo.capa}
                                alt="Imagem"
                                className="
                                    w-full transition-transform
                                    duration-300 hover:brightness-110
                                    max-h-72
                                "
                                loading="lazy"
                            />

                            {/* BADGE */}

                            <span
                                className={`
                                    absolute top-4 left-4
                                    px-4 py-1 rounded-2xl
                                    text-sm font-semibold
                                    ${status.badge}
                                `}
                            >
                                {status.label}
                            </span>

                        </div>

                        {/* =========================
                            CONTEÚDO
                        ========================= */}

                        <div className="
                            flex flex-col gap-1
                            py-5 px-5
                        ">

                            <h1 className="text-2xl">
                                {expo.titulo}
                            </h1>

                            <p className="text-black/60">
                                {expo.descricao}
                            </p>

                            {/* =========================
                                DATA + HORA
                            ========================= */}

                            <div className="
                                flex flex-col mt-2 gap-1
                            ">

                                <div className="
                                    flex items-center gap-2
                                    text-black/80
                                ">

                                    <IoCalendarClearOutline
                                        size={18}
                                    />

                                    <p>
                                        {formatDate(
                                            expo.data_inicio
                                        )} - {" "}
                                        {formatDate(
                                            expo.data_fim
                                        )}
                                    </p>

                                </div>

                                <div className="
                                    flex items-center gap-2
                                    text-black/70
                                ">

                                    🕒

                                    <p>
                                        {formatTime(
                                            expo.data_inicio
                                        )} - {" "}
                                        {formatTime(
                                            expo.data_fim
                                        )}
                                    </p>

                                </div>

                                <div className="
                                    flex items-center gap-2
                                    text-black/70
                                ">

                                    <LuClock size={18} />

                                    <p>
                                        {expo.local}
                                    </p>

                                </div>

                                {/* VAGAS */}

                                <div className="
                                    flex items-center gap-2
                                    text-black/70
                                ">

                                    🎟️

                                    <p>
                                        Vagas disponíveis:
                                        {" "}
                                        {expo.vagas_disponiveis}
                                    </p>

                                </div>

                            </div>

                            {/* =========================
                                BOTÕES
                            ========================= */}

                            <div className="
                                flex gap-4 py-3
                            ">

                                {status.button}

                                <button
                                    className="
                                        cursor-pointer
                                        px-6 py-2
                                        border border-black/30
                                        rounded-lg
                                        hover:bg-black/30
                                        hover:text-white
                                    "
                                >
                                    Ver Mais
                                </button>

                            </div>

                        </div>

                    </div>
                );
            })}

            {/* =========================
                    TOAST
            ========================= */}

            {toast?.message && (

                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() =>
                        setToast({
                            message: "",
                            type: null
                        })
                    }
                />
            )}

        </motion.div>
    );
}

export default CardExposicoes;