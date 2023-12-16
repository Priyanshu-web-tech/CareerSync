import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";


export default function Jobs() {
  const theme = useSelector((state) => state.theme);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <motion.div
      className={`py-12 sm:py-20 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-40   ${
        theme.darkMode ? "dark:bg-slate-700 text-white" : "bg-gray-100"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center "
          variants={textVariants}
        >
            Welcome to Carrer
          <span className="text-teal-600">Sync</span>
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-3 mt-11"
          variants={textVariants}
        >
          <motion.div className="text-lg " variants={textVariants}>
            <p className="mb-8">
              At CareerSync, we connect you with a wide range of career
              opportunities in various industries and fields.
            </p>
            <p className="mb-8">
              Our dedicated team is committed to helping you find the perfect
              job that matches your skills and aspirations.
            </p>
            <p className="mb-8">
              We empower you in achieving your career goals by providing expert
              guidance and insights into the job market.
            </p>
          </motion.div>
          <motion.div className="text-lg " variants={textVariants}>
            <p className="mb-8">
              Our aim is to support you in every step of your job search,
              ensuring a seamless and rewarding experience.
            </p>
            <p className="mb-8">
              Partnering with top companies, we bring you opportunities that
              align with your career aspirations.
            </p>
            <p className="mb-8">
              We believe in making your job search not just successful but also
              fulfilling and exciting.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
