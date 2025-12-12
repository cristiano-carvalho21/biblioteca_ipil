import React from "react";
import {FiSearch} from "react-icons/fi";

function InputGroupNone({type, placeholder})
{
    return(
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full  border border-2">
            <button className="text-cinza-700 px-4 py-2 "> <FiSearch size={20}/> </button>
            <input type={type} placeholder={placeholder} className="flex-1 px-4 py-2 outline-none "/>
        </div>
    );
}
export default InputGroupNone;