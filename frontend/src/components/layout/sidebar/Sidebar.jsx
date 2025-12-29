import { NavLink } from "react-router-dom";
import { camposBotton, camposMain } from "../Campos";
import { LuBookOpen } from "react-icons/lu";

function Sidebar()
{
    return(
        <aside className="w-96 h-screen flex flex-col border border-b-0 border-t-0 border-l-0 border-cinza-500 bg-branco-100">

            <nav className="px-5 space-y-5 p-4">
                {camposMain.map(campo =>(
                    <NavLink
                        to={campo.caminho}
                        className={({ isActive }) =>
                            `nav-btn w-3/4 flex gap-2 items-center transition-colors duration-200 ${
                            isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                            }`
                        }
                        >
                        {campo.icone} {campo.label}
                    </NavLink>
                ))}
            </nav>
            <div className="flex-1"></div>
            <nav className="px-5 space-y-5 pb-4">
                {camposBotton.map(campo =>(
                    <NavLink
                        to={campo.caminho}
                        className={({ isActive }) =>
                            `nav-btn w-3/4 flex gap-2 items-center transition-colors duration-200 ${
                            isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                            }`
                        }
                        >
                        {campo.icone} {campo.label}
                    </NavLink>
                ))}
            </nav>

        </aside>
    );
}
export default Sidebar;