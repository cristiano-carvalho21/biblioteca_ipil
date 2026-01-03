import Sidebar from "../../layout/sidebar/Sidebar";
import AdminNav from "../../layout/adminNav/AdminNav";
import { Outlet } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import { camposMain, camposBotton } from "../../layout/Campos";
import { NavLink } from "react-router-dom";

function Admin()
{
    const [isOpen, setIsOpen] = useState(false);

    return(
        <main className="flex flex-row min-h-screen bg-branco-50">
            <div className="absolute top-64 left-4 z-30">
                <button className="md:hidden py-3" onClick={() =>setIsOpen(!isOpen)}> 
                    <HiOutlineMenu size={30}/>
                </button>
            </div>
            {isOpen && (
                <div className="absolute top-72 left-4 bg-branco-100 shadow-lg rounded p-4 z-50 w-52">
                    <nav className="px-5 space-y-5 p-4">
                        {camposMain.map(campo =>(
                            <NavLink onClick={() => setIsOpen(false)}
                                to={campo.caminho}
                                className={({ isActive }) =>
                                    `nav-btn w-full flex gap-2 items-center transition-colors duration-200 ${
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
                                    `nav-btn w-full flex gap-2 items-center transition-colors duration-200 ${
                                    isActive ? "border-laranja-500 text-laranja-600 bg-laranja-100"  : ""
                                    }`
                                }
                                >
                                {campo.icone} {campo.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
            <section className="mt-10 pb-20 hidden md:block">
                <Sidebar/>
            </section>
            <section className="flex-1 overflow-y-auto p-4 md:p-10">
                <AdminNav/>
                <Outlet/>
            </section>
        </main>
    );
}
export default Admin;