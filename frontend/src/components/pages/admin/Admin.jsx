import Sidebar from "../../layout/sidebar/Sidebar";
import AdminNav from "../../layout/adminNav/AdminNav";
import { Outlet } from "react-router-dom";
//import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

function Admin()
{
    const [showSidebar, setShowSidebar] = useState(false);

    return(
        <main className="flex flex-row min-h-screen bg-branco-50">
            <div className="absolute top-64 left-4 z-30">
                <button className="md:hidden py-3" onClick={() =>setShowSidebar(true)}> 
                    =
                </button>
            </div>
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