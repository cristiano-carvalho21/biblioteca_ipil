import React from "react";
import {FiSearch} from "react-icons/fi";

function InputGroup({type, placeholder, onPesquisar})
{
    return(
        <div className="flex items-center border border-gray-100 rounded-md overflow-hidden w-full max-w-md relative
            relative focus-within:ring-2 focus-within:ring-blue-500 transition
        ">
            <input type={type} placeholder={placeholder} 
            className="flex-1 px-4 py-2  outline-none
            " onChange={(e) => onPesquisar(e.target.value)}/>
            <button className="text-branco-100 px-4 py-2 hover:bg-laranja-700 transition"> <FiSearch size={20}/> </button>
        </div>
    );
}
export default InputGroup;