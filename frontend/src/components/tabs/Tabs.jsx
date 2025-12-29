import { useState } from "react";

function Tabs({tabs, defaultTab = 0})
{
    const [active, setActive] = useState(defaultTab);

    return(
        <div className="space-y-20">
            <nav className="inline-flex items-center gap-2 rounded-full bg-cinza-100 p-1">
                {tabs.map((tab, index) => (
                    <button key={tab.label} onClick={() => setActive(index)} 
                    className={`px-6 py-2 text-sm font-medium rounded-full transition-all 
                    ${ active === index ? "bg-branco-100 text-cinza-900 shadow" : "text-cinza-700 hover:text-cinza-900"}`}>
                        {tab.label}
                    </button>
                ))}
            </nav>
            <section className="pt-2">
                {tabs[active].content}
            </section>
        </div>
        

                /*
        <div>
            <nav className="flex gap-6 border-b">
                {tabs.map((tab, index) => (
                    <button key={tab.label} onClick={() => setActive(index)} 
                    className={`pb-2 text-sm font-medium transition 
                    ${ active === index ? "border-b-2 border-indigo-600 text-indigo-600" : "text-cinza-700 hover:text-cinza-900"}`}>
                        {tab.label}
                    </button>
                ))}
            </nav>
            <section className="mt-6">
                {tabs[active].content}
            </section>
        </div>
        */

       
    );
}
export default Tabs;