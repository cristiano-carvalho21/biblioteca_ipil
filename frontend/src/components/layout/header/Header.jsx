import { NavLink} from "react-router-dom"
import {LuBookOpen} from "react-icons/lu"
import {MdOutlineHome, MdPersonOutline} from "react-icons/md"
import {IoCalendarClearOutline} from "react-icons/io5"
import {GiGreekTemple} from "react-icons/gi"
import {RiBookShelfLine} from "react-icons/ri"

function Header()
{
    return (
            <header className="flex flex-wrap w-full justify-between border-5 bg-branco-100">

                <section className="flex items-center gap-2 p-4 flex-wrap ml-5">
                    <div className="bg-laranja-500 p-2 rounded-md flex items-center justify-center">
                        <LuBookOpen size={45} className="text-branco-100"/ >
                    </div>
                    <h1 className="text-laranja-500 font-normal text-xl">Biblioteca IPIL</h1>
                </section>


                <section className="flex gap-4 p-4 flex-wrap ">

                    <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        `nav-btn flex gap-2 items-center transition-colors duration-200 ${
                        isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100" : ""
                        }`
                    }
                    >
                    <MdOutlineHome size={30} /> Página Inicial
                    </NavLink>

                    <NavLink
                    to="/catalogo"
                    className={({ isActive }) =>
                        `nav-btn flex gap-2 items-center transition-colors duration-200 ${
                        isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                        }`
                    }
                    >
                    <RiBookShelfLine size={30} /> Catálogo
                    </NavLink>

                    <NavLink
                    to="/reservas"
                    className={({ isActive }) =>
                        `nav-btn flex gap-2 items-center transition-colors duration-200 ${
                        isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                        }`
                    }
                    >
                    <LuBookOpen size={30} /> Reservas
                    </NavLink>

                    <NavLink
                    to="/exposicoes"
                    className={({ isActive }) =>
                        `nav-btn flex gap-2 items-center transition-colors duration-200 ${
                        isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                        }`
                    }
                    >
                    <IoCalendarClearOutline size={30} /> Exposições
                    </NavLink>

                    <NavLink
                    to="/meuperfil"
                    className={({ isActive }) =>
                        `nav-btn flex gap-2 items-center transition-colors duration-200 ${
                        isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                        }`
                    }
                    >
                    <MdPersonOutline size={30} /> Meu Perfil
                    </NavLink>

                    <NavLink
                    to="/institucional"
                    className={({ isActive }) =>
                        `nav-btn flex gap-2 items-center transition-colors duration-200 ${
                        isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                        }`
                    }
                    >
                    <GiGreekTemple size={30} /> Institucional
                    </NavLink>

            </section>
            </header>
    );
}
export default Header;











