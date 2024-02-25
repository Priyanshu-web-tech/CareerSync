import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar/Sidebar";
import { FaFilter } from "react-icons/fa6";

const Accordion = ({ handleChange, handleClick }) => {
  const theme = useSelector((state) => state.theme);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`max-w-md mx-auto ${
        theme.darkMode
          ? "dark:bg-slate-800 text-white"
          : "bg-[#FAFAFA] text-black"
      }`}
    >
      <div className="border border-gray-300 rounded-md">
        <motion.div layout onClick={toggleAccordion}>
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer">
            <h2 className="text-lg font-semibold">Apply Filters</h2>

            <FaFilter className="w-5 h-5" />
          </div>
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="border-t border-gray-300 px-4 py-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sidebar handleChange={handleChange} handleClick={handleClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Accordion;