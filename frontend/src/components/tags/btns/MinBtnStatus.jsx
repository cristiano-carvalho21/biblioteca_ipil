import { LuClock } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

function MinBtnStatus({estado, label})
{
    return(
        <button className={`minBtnStatus ${estado === "Pendente" ? "minBtnStatus-pendente" 
                            : estado === "Reservado" ? "minBtnStatus-reservado" : ""}`} > 
        { 
            estado === "Reservado" ? (
                <FiCheckCircle size={15} />
            ) : estado === "Pendente" ? (
                <LuClock size={15} />
            ) :(
                null
            )
        }
            <div>
                <p className="text-sm"> {estado} </p>
                <p className="text-xs ps-2">{label}</p>
            </div>
        </button>
    );
}
export default MinBtnStatus;