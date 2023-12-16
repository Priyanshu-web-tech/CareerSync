import React from 'react';
import { useSelector } from "react-redux";


function Footer() {
  const theme = useSelector((state) => state.theme);

  return (
    <footer className={`text-center text-gray-700 py-4 ${
      theme.darkMode ? "dark:bg-slate-800 text-white" : ""
    }`}>
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} . All Rights Reserved.
        </p>
        <p>
          Made by <span className='text-teal-600'> Priyanshu</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
