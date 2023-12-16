import React from "react";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";


const PageHeader = ({title,path}) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className={`py-5   rounded flex items-center justify-center ${
      theme.darkMode ? "dark:bg-slate-700 text-white" : "bg-[#FAFAFA] text-black"
    }`}>
      <div>
        <h2 className="text-3xl text-teal-600 font-medium mb-1 text-center">
          {title}
        </h2>
        <p className="text-center text-sm">
          <Link to="/">Home</Link> / {path}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
