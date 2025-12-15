import {LuBookOpen} from "react-icons/lu"
import {MdOutlineHome, MdPersonOutline} from "react-icons/md"
import {IoCalendarClearOutline} from "react-icons/io5"
import {GiGreekTemple} from "react-icons/gi"
import {RiBookShelfLine} from "react-icons/ri"


    export const paginas = [
        {icone:<MdOutlineHome size={30} />, caminho:"home", label:"Home"},
        {icone:<RiBookShelfLine size={30} />, caminho:"catalogo", label:"Catálogo"},
        {icone:<LuBookOpen size={30} />, caminho:"reservas", label:"Reservas"},
        {icone:<IoCalendarClearOutline size={30} />, caminho:"exposicoes", label:"Exposições"},
        {icone:<MdPersonOutline size={30} />, caminho:"meuperfil", label:"Meu Perfil"},
        {icone:<GiGreekTemple size={30} />, caminho:"institucional", label:"Institucional"}
    ];