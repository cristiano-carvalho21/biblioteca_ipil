import { NavLink} from "react-router-dom"
import {LuBookOpen} from "react-icons/lu"
import { paginas } from "./navbar/NavBar"

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
                    {paginas.map(pagina =>(
                            <NavLink
                                to={pagina.caminho}
                                className={({ isActive }) =>
                                    `nav-btn flex gap-2 items-center transition-colors duration-200 ${
                                    isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                                    }`
                                }
                                >
                                {pagina.icone} {pagina.label}
                            </NavLink>
                    ))}
                </section>
            </header>
    );
}
export default Header;











