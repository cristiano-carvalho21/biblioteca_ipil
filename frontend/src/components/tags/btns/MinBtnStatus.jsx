import { LuClock } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

function MinBtnStatus({estado, label})
{
    return(
        <button className={`minBtnStatus ${estado === "Pendente" ? "minBtnStatus-pendente" 
                            : estado === "Reservado" ? "minBtnStatus-reservado" : ""}`} > 
        { 
            estado === "Reservado" ? (
                <FiCheckCircle size={20} />
            ) : estado === "Pendente" ? (
                <LuClock size={20} />
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
export default MinBtnStatus;