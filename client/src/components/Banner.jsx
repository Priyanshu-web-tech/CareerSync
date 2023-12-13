import React from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const Banner = ({ query, handleInputChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl text-center font-bold text-primary mb-3"
      >
        Unlock Limitless Opportunities Your <span className="text-teal-600">Dream Job </span>Awaits!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-lg text-center text-black/70 mb-8"
      >
        Explore a vast array of career opportunities in cutting-edge fields like computer science, and technology.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex justify-center items-center md:flex-row flex-col md:gap-0 gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-800 md:w-3/4 w-full"
        >
          <input
            type="text"
            name="title"
            id="title"
            placeholder="What position are you looking for?"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:loading-6"
            onChange={handleInputChange}
            value={query}
          />

          <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
