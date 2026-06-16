import Cabecalho from "../casa/cabecalho/cabecalho";
import { motion } from "framer-motion";
import {LuClock} from "react-icons/lu"
import {IoCalendarClearOutline} from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "../../service/api/api";
import Skeleton from "../../layout/motion/skeleton/skeleton";
import Toast from "../stylenotificacao/toast";

function MeusEventos()
{
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({
        message:"",
        type:null
    });
    const isLoading = loading;

    
    const carregarEventos = async () => {
        try {
            const res = await api.get("/livros/meus-eventos/");
            setEventos(res.data);
        } catch (error) {
            setToast({
                message: "Erro na captura" + error,
                type: "error",
            });

            console.log("Erro na captura", error);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        carregarEventos();
    }, []);

    const cancelar = async (id) => {
        try {
            await api.post(`/livros/gestao-eventos/${id}/cancelar_reserva/`); 
            setToast({
                message: "Evento cancelado com sucesso!",
                type: "success",
            });
            
            await carregarEventos();
            console.log("Evento cancelado com sucesso!");
        } catch (error) {
            if (error.response?.data) {
                const erros = Object.values(error.response.data)
                    .flat()
                    .join(" ");

                setToast({
                    message: erros,
                    type: "error",
                });

                console.log("Erro:", erros);
            } else {
                setToast({
                    message: "Erro ao comunicar com o servidor",
                    type: "error",
                });

                console.log("Erro ao comunicar com o servidor");
            }
        }
    }

    if(eventos){
        if (loading) {
            return <Skeleton type="card" count={8} />;
        }
    }

    if (!eventos) return <p className="text-red-600 text-center mt-20">Nenhum evento reservado.</p>;

    return(
        <div>
            <Cabecalho/>
            <motion.main initial={{ opacity: 0, y: 20 }}       // começa invisível e levemente abaixo
                whileInView={{ opacity: 1, y: 0 }}   // anima quando entra na tela
                viewport={{ once: true }}             // anima apenas uma vez
                transition={{ duration: 0.8 }} >

                <div className="py-32 px-5 h-52 flex flex-col items-start justify-center">
                    <h4 className="text-4xl">Meus Eventos</h4>
                    <p className="pt-2 text-xl text-[#000000]/57">Eventos do meu gosto</p>
                </div>
            </motion.main>
            <motion.div initial={{ opacity: 0, y: 20 }}       // começa invisível e levemente abaixo
            whileInView={{ opacity: 1, y: 0 }}   // anima quando entra na tela
            viewport={{ once: true }}             // anima apenas uma vez
            transition={{ duration: 0.8 }} 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {eventos.map((ev) => (
                    <div className="flex flex-col w-full" key={ev.id}>
                        <div className="w-full">
                            <img src={ev.capa}
                            alt="Imagem" className="w-full transition-transform
                            duration-300 hover:brightness-110 max-h-72" loading="lazy"/>
                            <span className="flex items-center top-5 left-8 absolute bg-blue-100 px-4 py-1 gap-1 rounded-2xl">
                                {/* <LuStar size={20} className="text-[#F97B17]"/> */}
                                <p className="text-[#f97b17] font-semibold">{ev.estado}</p> 
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 py-5 px-5">
                            {/* <span className=" text-blue-500 font-medium bg-blue-200 py-1 px-3 rounded-2xl max-w-36 text-center">Evento</span> */}
                            <h1 className="text-2xl">{ev.titulo}</h1>
                            <p className="text-black/57">{ev.descricao}</p>
                            <div className="flex flex-col">
                                <div className="bg-branco-50 text-cinza-900 flex gap-2"> 
                                    <IoCalendarClearOutline size={20}/> 
                                    <p>{ev.data}</p>
                                </div>
                                <div className="text-black/85 flex gap-2" > 
                                    <LuClock size={20}/> 
                                    <p>{ev.local}</p>
                                </div>
                            </div>
                            <div className="flex gap-10 py-2">
                                <button onClick={() => cancelar(ev.id)}
                                    className="text-white px-10 p-2 rounded-lg bg-[#F97B27] cursor-pointer hover:bg-[#F86417]">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
            {/* 
            =========================
                        TOAST
            ========================= 
            */}
            {toast && (
                <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}

export default MeusEventos;