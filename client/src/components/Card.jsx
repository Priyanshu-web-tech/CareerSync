import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";


function Card({ data }) {

  const theme = useSelector((state) => state.theme);

  const {
    _id,
    companyName,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
    jobTitle,
  } = data;

  const cardVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className={`card  overflow-hidden shadow-lg  p-4 mb-6 ${
        theme.darkMode ? "dark:bg-slate-800 text-neutral-300" : "bg-white "
      } `}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Link
        to={`/job/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <motion.img
          width={50}
          src={companyLogo}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="mb-1 font-bold">{companyName}</h4>

          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

          <motion.div
            className="flex  text-sm flex-wrap gap-4 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span className="flex items-center gap-2">
              <FiMapPin  /> {jobLocation}
            </motion.span>
            <motion.span className="flex items-center gap-2">
              <FiClock  /> {employmentType}
            </motion.span>
            <motion.span className="flex items-center gap-2">
              <FiDollarSign  /> {minPrice}-{maxPrice}k
            </motion.span>
            <motion.span className="flex items-center gap-2">
              <FiCalendar  /> {postingDate}
            </motion.span>
          </motion.div>

          <motion.p
            className="text-sm  "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {description.slice(0,100)}
            <span className="font-extrabold">......</span>
          </motion.p>
        </motion.div>
      </Link>
    </motion.section>
  );
}

export default Card;