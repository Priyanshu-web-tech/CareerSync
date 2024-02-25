import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const TableSkeleton = () => {
  const theme = useSelector((state) => state.theme);
  const arr = [0, 1, 2, 3, 4, 5, 6];

  return (
    <table className="items-center bg-transparent w-full border-collapse ">
      <thead>
        <tr>
          {[...Array(6)].map((_, index) => (
            <th
              className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              key={index}
            >
              <Skeleton
                baseColor={`${theme.darkMode ? "#1e293b" : ""}`}
                highlightColor={`${theme.darkMode ? "#0f172a" : ""}`}
                style={{
                  width: 100,
                }}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {arr.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(6)].map((_, colIndex) => (
              <td
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                key={colIndex}
              >
                <Skeleton
                  baseColor={`${theme.darkMode ? "#1e293b" : ""}`}
                  highlightColor={`${theme.darkMode ? "#0f172a" : ""}`}
                  style={{
                    width: 100,
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
