import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

function Card({ data }) {
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
      className="card  overflow-hidden shadow-lg bg-white p-4 mb-6"
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
          <h4 className="text-primary mb-1 font-bold">{companyName}</h4>

          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

          <motion.div
            className="flex text-primary/70 text-sm flex-wrap gap-4 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span className="flex items-center gap-2">
              <FiMapPin className="text-gray-500" /> {jobLocation}
            </motion.span>
            <motion.span className="flex items-center gap-2">
              <FiClock className="text-gray-500" /> {employmentType}
            </motion.span>
            <motion.span className="flex items-center gap-2">
              <FiDollarSign className="text-gray-500" /> {minPrice}-{maxPrice}k
            </motion.span>
            <motion.span className="flex items-center gap-2">
              <FiCalendar className="text-gray-500" /> {postingDate}
            </motion.span>
          </motion.div>

          <motion.p
            className="text-sm text-primary/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </Link>
    </motion.section>
  );
}

export default Card;
