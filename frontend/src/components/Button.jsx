import React from "react"

const Button =(props) => {
    return(
       <button className='bg-indigo-600 text-white font-[poppins] py-2 px-6 rounded  gap-5 hover:bg-orange-400 duration-500 '>
        {props.children}
       </button>
    )
}  

export default Button


//git add --all
//git commit -m "commit" 
// git push