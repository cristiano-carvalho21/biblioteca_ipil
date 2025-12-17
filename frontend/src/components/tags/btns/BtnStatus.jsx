import { LuClock } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

function BtnStatus({estado, label})
{
    return(
        <button className={`btnStatus ${estado === "Pendente" ? "btnStatus-pendente" 
                            : estado === "Reservado" ? "btnStatus-reservado" : ""}`} > 
        { 
            estado === "Reservado" ? (
                <FiCheckCircle size={35} />
            ) : estado === "Pendente" ? (
                <LuClock size={35} />
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

