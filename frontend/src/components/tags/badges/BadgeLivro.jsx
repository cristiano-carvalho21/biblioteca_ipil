import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import {LuClock} from "react-icons/lu"

function BadgeLivro({estado})
{
    return(
    <span
      className={`badge ${
        estado === "Disponível"
          ? "badge-disponivel"
          : estado === "Reservado"
          ? "badge-disponivel"
          : estado === "Emprestado"
          ? "badge-emprestado"
          : estado === "Pendente"
          ? "badge-pendente"
          : ""
      }`}
    >
      {
        estado === "Disponível" ? (
          <FiCheckCircle size={16} />
        ) : estado === "Reservado" ? (
          <LuClock size={16} />
        ) : estado === "Emprestado" ? (
          <FiXCircle size={16} />
        ) : estado === "Pendente" ? (
          <LuClock size={16} />
        ) : null
      }

      <p>{estado}</p>
    </span>
    );
}
export default BadgeLivro;