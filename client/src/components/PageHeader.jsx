import React from "react";
import { Link} from "react-router-dom";

const PageHeader = ({title,path}) => {
  return (
    <div className="py-24 mt-3 bg-[#FAFAFA] rounded flex items-center justify-center">
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
