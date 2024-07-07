import React from "react"

const Button =({name, BtnFunc}) => {
    return(
       <button className='bg-indigo-600 text-white font-[poppins] py-2 px-6 rounded md:ml-8 hover:bg-orange-400 duration-500 '
       onClick={BtnFunc}>
        {name}
       </button>
    )
}  

export default Button