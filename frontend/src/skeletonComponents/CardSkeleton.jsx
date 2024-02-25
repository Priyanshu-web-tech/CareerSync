import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const CardSkeleton = () => {
  const theme = useSelector((state) => state.theme);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const arr = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600); // Adjust the viewport width condition as needed
    };

    // Initial check for screen size on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return arr.map((item, id) => (
    <section key={id} className={`card flex gap-3`}>
      <Skeleton
        baseColor={`${theme.darkMode ? "#1e293b" : ""} `}
        highlightColor={`${theme.darkMode ? "#0f172a" : ""} `}
        width={50}
        height={70}
      />

      <div className="flex flex-col">
        <Skeleton
          baseColor={`${theme.darkMode ? "#1e293b" : ""} `}
          highlightColor={`${theme.darkMode ? "#0f172a" : ""} `}
          style={{
            width:isSmallScreen ? 50 : 100,
          }}
        />
        <Skeleton
          baseColor={`${theme.darkMode ? "#1e293b" : ""} `}
          highlightColor={`${theme.darkMode ? "#0f172a" : ""} `}
          style={{
            width:isSmallScreen ? 50 : 100,
          }}
        />

        {/* Conditional width based on screen size */}
        <div>
          <Skeleton
            baseColor={`${theme.darkMode ? "#1e293b" : ""} `}
            highlightColor={`${theme.darkMode ? "#0f172a" : ""} `}
            style={{
              width: isSmallScreen ? 100 : 400,
            }}
          />
          <Skeleton
            baseColor={`${theme.darkMode ? "#1e293b" : ""} `}
            highlightColor={`${theme.darkMode ? "#0f172a" : ""} `}
            style={{
              width: isSmallScreen ? 100 : 400,
            }}
          />
        </div>
      </div>
    </section>
  ));
};

export default CardSkeleton;
