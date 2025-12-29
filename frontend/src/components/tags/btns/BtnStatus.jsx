import { LuClock } from "react-icons/lu";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function BtnStatus({estado, label})
{
    return(
        <button className={`btnStatus ${estado === "Pendente" ? "btnStatus-pendente" 
                           : estado === "Reservado" || estado === "Disponível" ? "btnStatus-reservado" : estado === "Emprestado" ? "btnStatus-emprestado" : ""}`} > 
        { 
            estado === "Reservado" ? (
                <FiCheckCircle size={35} />
            ) : estado === "Pendente" ? (
                <LuClock size={35} />
            ) : estado === "Emprestado" ? (
                <FiXCircle size={35} />
            ) : estado === "Disponível" ? (
                <FiCheckCircle size={35} />
            ) :(
                null
            )
        }
            <div>
                <p className="pe-10"> {estado} </p>
                <p className="text-sm ps-2">{label}</p>
            </div>
        </button>
    );
}
export default BtnStatus;

