import React from 'react'
import { useSelector } from "react-redux";


function Button({onClickHandler,value,title}) {
  const theme = useSelector((state) => state.theme);

  return (
    <button onClick={onClickHandler} value={value} className={`px-4 py-1 border text-base hover:bg-teal-600 ${
      theme.darkMode ? "dark:hover:text-black " : "hover:text-white "
    }`}>
        {title}
    </button>
  )
}

export default Button
