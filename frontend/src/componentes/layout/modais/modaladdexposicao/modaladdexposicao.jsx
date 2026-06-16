import { useState } from "react";
import api from "../../../service/api/api";
import { motion } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";

function ModalAddExposicao({onClose})
{
    const [form, setForm] = useState({
        titulo: "",
        capa: "",
        descricao: "",
        local: "",
        capacidade_maxima: "",
        data_inicio: "",
        data_fim: "",
    });

    const [modal, setModal] = useState({
        open: false,
        type: "success", // "success" ou "error"
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.value,
        });
    };
    
    const hoje = new Date();
    
    const dataMinimaPermitida = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        hoje.getDate() + 1
    ).toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            api.post("/livros/gestao-exposicoes/", form);

            setModal({
                open: true,
                type: "success",
                message: "Exposição criada com sucesso!",
            });

            setForm({
                titulo: "",
                capa: "",
                descricao: "",
                local: "",
                capacidade_maxima: "",
                data_inicio: "",
                data_fim: "",
            })
        } catch (error) {
            if (error.response?.data) {
                const erros = Object.values(error.response.data)
                    .flat()
                    .join(" ");

                setModal({
                    open: true,
                    type: "error",
                    message: erros,
                });
                setErro(erros);
            } else {
                alert("Erro ao comunicar com o servidor");
            }
        }

        setLoading(false);
    }


    return(
        <section>
            <dialog className="fixed inset-0 z-50 bg-black/40 flex items-center w-full h-screen justify-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }}       // começa invisível e levemente abaixo
                    whileInView={{ opacity: 1, y: 0 }}   // anima quando entra na tela
                    viewport={{ once: true }}             // anima apenas uma vez 
                    className="w-full max-w-lg md:max-w-2xl bg-white shadow-xl rounded-2xl p-6 relative"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-black/50 cursor-pointer hover:text-black">
                        <HiOutlineXMark size={35}/>
                    </button>
                    <article className="py-4 text-left">
                        <h2 className="text-xl font-medium">
                            Registar Exposições
                        </h2>
                        <p className="text-lg">
                            Registre exposições literárias
                        </p>
                    </article>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                            <div className="flex flex-col gap-1">
                                <label className="text-black/75 text-lg text-left">Titulo:</label>
                                <input type="text" required name="titulo" id="titulo" value={form.titulo} onChange={handleChange} placeholder="titulo da exposição" className="bg-black/5 outline-none py-2 px-2 rounded-lg text-black/70  font-medium focus:ring-2 focus:ring-green-500"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-black/75 text-lg text-left">
                                    Descrição
                                </label>
                                <textarea placeholder="Breve descrição da exposição..." required name="descricao" value={form.descricao} onChange={handleChange}
                                className="mt-1 w-full h-24 rounded-md border border-black/10 bg-black/5 outline-none px-3 py-2 text-black/70  font-medium focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-black/75 text-lg text-left">Local:</label>
                                <input type="text" required name="local" id="local" value={form.local} onChange={handleChange} placeholder="titulo da exposição" className="bg-black/5 outline-none py-2 px-2 rounded-lg text-black/70  font-medium focus:ring-2 focus:ring-green-500"/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-black/75 text-lg text-left">Capacidade Máxima:</label>
                                <input type="number" required name="capacidade_maxima" id="capacidade_maxima" value={form.capacidade_maxima} onChange={handleChange} placeholder="titulo da exposição" className="bg-black/5 outline-none py-2 px-2 rounded-lg text-black/70  font-medium focus:ring-2 focus:ring-green-500"/>
                            </div>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3"></div>
                            <div className="flex flex-col gap-1">
                                <label className="text-black/75 text-lg">Data Ínicio</label>
                                <input type="date" name="data_inicio"
                                    min={dataMinimaPermitida} required placeholder="2000-01-01"
                                    value={form.data_inicio} onChange={handleChange} 
                                    className="bg-black/5 outline-none py-2 px-2 rounded-lg text-black/70  font-medium focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-black/75 text-lg">Data Fim</label>
                                <input type="date" name="data_fim"
                                    min={dataMinimaPermitida} required placeholder="2000-01-01"
                                    value={form.data_fim} onChange={handleChange} 
                                    className="bg-black/5 outline-none py-2 px-2 rounded-lg text-black/70  font-medium focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-black/75 text-lg">URL da capa</label>
                                <input type="text" name="capa" required placeholder="htpps://google.com/image.jpeg" value={form.capa} onChange={handleChange}
                                    className="bg-black/5 outline-none py-2 px-2 rounded-lg text-black/70  font-medium focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full sm:w-auto border border-black/10 cursor-pointer text-black/70 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-green-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                {loading ? "Registando...." : "Registar"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </dialog>

            {modal.open && (
                <motion.div initial={{ opacity: 0, y: 20 }}       // começa invisível e levemente abaixo
                    whileInView={{ opacity: 1, y: 0 }}   // anima quando entra na tela
                    viewport={{ once: true }}             // anima apenas uma vez 
                    className="fixed inset-0 z-50 bg-black/40 flex items-center w-full h-screen justify-center p-4">
                    <div className="w-full text-start max-w-96 md:max-w-lg bg-white shadow-xl rounded-2xl p-6 relative">
                        <h3 className="text-lg  font-semibold mb-2">
                            {modal.type === "success" ? "Sucesso" : "Erro"}
                        </h3>
                        <p>{modal.message}</p>
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                            <button
                                type="submit"
                                onClick={() => {
                                    if (modal.type === "success") {
                                        setModal({ open: false });
                                        onClose()
                                    } else {
                                        setModal({ ...modal, open: false }); // apenas fecha no erro
                                    }
                                }}
                                className={`cursor-pointer px-6 py-2 rounded-lg border border-black/10 text-white transition ${
                                    modal.type === "success" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                {modal.type === "success" ? "Confirmado" : "Tente novamente"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </section>
    );
}

export default ModalAddExposicao;



// import { useState } from "react";
// import api from "../../../service/api/api";
// import { motion } from "framer-motion";
// import { HiOutlineXMark } from "react-icons/hi2";

// function ModalAddExposicao({ onClose, onSuccess }) {

//     const [form, setForm] = useState({
//         titulo: "",
//         capa: "",
//         descricao: "",
//         local: "",
//         capacidade_maxima: "",
//         data_inicio: "",
//         data_fim: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const [modal, setModal] = useState({
//         open: false,
//         type: "success",
//         message: "",
//     });

//     function handleChange(e) {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const res = await api.post(
//                 "/admin/exposicoes/",
//                 form
//             );

//             setModal({
//                 open: true,
//                 type: "success",
//                 message: "Exposição criada com sucesso!"
//             });

//             setForm({
//                 titulo: "",
//                 capa: "",
//                 descricao: "",
//                 local: "",
//                 capacidade_maxima: "",
//                 data_inicio: "",
//                 data_fim: "",
//             });

//             onSuccess?.(res.data);

//         } catch (err) {
//             const msg = err.response?.data
//                 ? Object.values(err.response.data).flat().join(" ")
//                 : "Erro ao criar exposição";

//             setModal({
//                 open: true,
//                 type: "error",
//                 message: msg
//             });

//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <>
//             <section className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="w-full max-w-lg md:max-w-2xl bg-white shadow-xl rounded-2xl p-6 relative"
//                 >

//                     <button
//                         onClick={onClose}
//                         className="absolute top-4 right-4 text-black/50 cursor-pointer hover:text-black"
//                     >
//                         <HiOutlineXMark size={35} />
//                     </button>

//                     <article className="py-4 text-left">
//                         <h2 className="text-xl font-medium">Registar Exposições</h2>
//                         <p className="text-lg">Registre exposições literárias</p>
//                     </article>

//                     <form onSubmit={handleSubmit} className="space-y-4">

//                         {/* Título */}
//                         <input
//                             name="titulo"
//                             value={form.titulo}
//                             onChange={handleChange}
//                             placeholder="Título da exposição (ex: Feira do Livro 2026)"
//                             className="w-full p-2 bg-black/5 rounded"
//                         />

//                         {/* Descrição */}
//                         <textarea
//                             name="descricao"
//                             value={form.descricao}
//                             onChange={handleChange}
//                             placeholder="Descreve brevemente o objetivo da exposição..."
//                             className="w-full p-2 bg-black/5 rounded"
//                         />

//                         {/* Local */}
//                         <input
//                             name="local"
//                             value={form.local}
//                             onChange={handleChange}
//                             placeholder="Local da exposição (ex: IPIL - Sala Magna)"
//                             className="w-full p-2 bg-black/5 rounded"
//                         />

//                         {/* Capacidade */}
//                         <input
//                             type="number"
//                             name="capacidade_maxima"
//                             value={form.capacidade_maxima}
//                             onChange={handleChange}
//                             placeholder="Número máximo de participantes"
//                             className="w-full p-2 bg-black/5 rounded"
//                         />

//                         {/* Datas organizadas */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

//                             <div className="flex flex-col gap-1">
//                                 <label className="text-sm text-left text-black/70">
//                                     Data de Início
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="data_inicio"
//                                     value={form.data_inicio}
//                                     onChange={handleChange}
//                                     className="w-full p-2 bg-black/5 rounded"
//                                 />
//                             </div>

//                             <div className="flex flex-col gap-1">
//                                 <label className="text-sm text-left text-black/70">
//                                     Data de Término
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="data_fim"
//                                     value={form.data_fim}
//                                     onChange={handleChange}
//                                     className="w-full p-2 bg-black/5 rounded"
//                                 />
//                             </div>

//                         </div>

//                         {/* Capa */}
//                         <input
//                             name="capa"
//                             value={form.capa}
//                             onChange={handleChange}
//                             placeholder="URL da imagem de capa (ex: https://...)"
//                             className="w-full p-2 bg-black/5 rounded"
//                         />

//                         {/* Ações */}
//                         <div className="flex justify-end gap-3">

//                             <button type="button" className="px-4 py-2 rounded bg-black/10 cursor-pointer" onClick={onClose}>
//                                 Cancelar
//                             </button>

//                             <button
//                                 type="submit"
//                                 className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
//                             >
//                                 {loading ? "A guardar..." : "Guardar"}
//                             </button>

//                         </div>

//                     </form>

//                 </motion.div>
//             </section>

//             {/* FEEDBACK PADRÃO ADMIN */}
//             {modal.open && (
//                 <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//                     <div className="bg-white p-5 rounded-lg w-80">
//                         <h3 className="font-semibold">
//                             {modal.type === "success" ? "Sucesso" : "Erro"}
//                         </h3>
//                         <p>{modal.message}</p>

//                         <button
//                             onClick={() => {
//                                 setModal({ open: false });
//                                 if (modal.type === "success") onClose();
//                             }}
//                             className="mt-3 w-full bg-green-500 text-white py-2 rounded cursor-pointer"
//                         >
//                             OK
//                         </button>
//                     </div>
//                 </div>
//             )}

//         </>
//     );
// }

// export default ModalAddExposicao;

