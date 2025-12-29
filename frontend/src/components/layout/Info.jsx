import {AiOutlineMail} from "react-icons/ai";
import {LuClock} from "react-icons/lu"
import {  FiMapPin, FiPhone } from "react-icons/fi";

export const info = [
    {icone: <AiOutlineMail size={25} className="text-laranja-500"/>, label: "Email:", info: "biblioteca@ipil.ao"},
    {icone: <FiPhone size={25} className="text-laranja-500"/>, label: "Telefone:", info: "974107262"},
    {icone: <FiMapPin size={25} className="text-laranja-500"/>, label: "Localização:", info: "Istituto Politécnico Industrial de Luanda"},
    {icone: <LuClock size={25} className="text-laranja-500"/>, label: "Horário de Atendimento:", info: "Segunda à Sexta: 08h00 - 18h00 Sábado: 08h00 - 13h00"}
]