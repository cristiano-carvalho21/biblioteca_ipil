import React from "react";
import {FiSearch} from "react-icons/fi";

function InputGroup({type, placeholder, value, onChange, page})
{
    return(
            <>
                {page === "home" ? (
                <div className="flex items-center border border-gray-100 rounded-md overflow-hidden w-full max-w-md
                    relative focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="flex-1 px-4 py-2  outline-none"/>
                    <button className="text-branco-100 px-4 py-2 hover:bg-laranja-700 transition"> <FiSearch size={20}/> </button>
                </div>
                ) : page === "catalogo" ? (
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full
                        relative focus-within:ring-2 focus-within:ring-blue-500 transition">
                        <button className="text-cinza-700 px-4 py-2 "> <FiSearch size={20}/> </button>
                        <input type={type} placeholder={placeholder} onChange={onChange}  className="flex-1 px-4 py-2 outline-none"/>
                    </div>
                ) : (
                    null
                )}
            </>
    );
}
export default InputGroup;