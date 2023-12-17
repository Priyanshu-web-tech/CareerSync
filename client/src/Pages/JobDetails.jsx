import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { useSelector } from "react-redux";
import {
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaClock,
  FaSuitcase,
  FaCheck,
} from "react-icons/fa";

const JobDetails = () => {
  const theme = useSelector((state) => state.theme);
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [applied, setApplied] = useState([]);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`/api/job/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  if(currentUser){
  useEffect(() => {
    fetch(`/api/apply/appliedJobs/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => setApplied(data));
  }, [currentUser._id]);

}

  const isAlreadyApplied = applied.some(
    (application) => application.job === id
  );

  const handleApply = async () => {

    if(!currentUser)
    {
      Swal.fire({
        text: "Sign in to apply for jobs",
        confirmButtonColor: "teal",
        background: `${theme.darkMode ? "#1e293b" : ""}`,
        color: `${theme.darkMode ? "white" : ""}`,
      });

      return ;
    }
    const application = {
      user: currentUser._id,
      job: id,
    };

    if (job.postedBy === currentUser.email) {
      Swal.fire({
        text: "You cannot apply to your own posted job",
        confirmButtonColor: "teal",
        background: `${theme.darkMode ? "#1e293b" : ""}`,
        color: `${theme.darkMode ? "white" : ""}`,
      });
      return; // Exit the function
    }


    fetch("/api/apply/apply-job", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(application),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged === true) {
          Swal.fire({
            text: "Applied Successfully",
            confirmButtonColor: "teal",
            background: `${theme.darkMode ? "#1e293b" : ""}`,
            color: `${theme.darkMode ? "white" : ""}`,
          });
        }
      })
      .catch((error) => {
        console.error("Error applying for job:", error);
      });
  };

  const disabledButtonStyle = {
    opacity: 0.6,
    cursor: "not-allowed",
  };

  const handleHover = (event) => {
    if (isAlreadyApplied) {
      event.currentTarget.querySelector(".overlay-text").style.display =
        "block";
    }
  };

  const handleLeave = (event) => {
    if (isAlreadyApplied) {
      event.currentTarget.querySelector(".overlay-text").style.display = "none";
    }
  };
  return (
    <div
      className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 p-10 ${
        theme.darkMode ? "dark:bg-slate-700 text-white" : ""
      }`}
    >
      <PageHeader title={"Single Job Page"} path={"single job"} />

      {/* Job Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="flex flex-col justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b pb-4"
          >
            <h2 className="text-3xl font-bold mb-2">{job.jobTitle}</h2>
            <p className=" mb-2">{job.companyName}</p>
            <div className="flex items-center mb-2">
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <FaMapMarkerAlt className="mr-2" />
              <p className="">{job.jobLocation}</p>
            </div>
            <p className="">{job.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Icons with Job Details */}
            <div className="flex items-center">
              <FaSuitcase className="mr-2" />
              <p className="font-semibold">Employment Type:</p>
              <p>{job.employmentType}</p>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <p className="font-semibold">Experience Level:</p>
              <p>{job.experienceLevel}</p>
            </div>
            <div className="flex items-center">
              <FaMoneyBillAlt className="mr-2" />
              <p className="font-semibold">Salary Range:</p>
              <p>
                {job.minPrice}k - {job.maxPrice}k
              </p>
            </div>
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <p className="font-semibold">Posted By:</p>
              <p>{job.postedBy}</p>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <p className="font-semibold">Posted On:</p>
              <p>{job.postingDate}</p>
            </div>
            <div className="flex items-center">
              <FaMoneyBillAlt className="mr-2" />
              <p className="font-semibold">Salary Type:</p>
              <p>{job.salaryType}</p>
            </div>
            <div className="flex items-center">
              <FaCheck className="mr-2" />
              <p className="font-semibold">Skills Required:</p>
              <div className="flex flex-wrap">
                {job.skills &&
                  Array.isArray(job.skills) &&
                  job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="  px-2 py-1 bg-gray-200 text-black rounded-full text-sm mr-2 mb-2"
                    >
                      {skill.label}
                    </span>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center items-center"
        >
          <button
            className="bg-teal-600 px-8 py-3  relative rounded-md shadow-md"
            onClick={handleApply}
            disabled={isAlreadyApplied}
            style={isAlreadyApplied ? disabledButtonStyle : null}
            onMouseOver={handleHover}
            onMouseLeave={handleLeave}
          >
            Apply Now
            {isAlreadyApplied && (
              <span className="overlay-text absolute top-0 left-0 bg-gray-500   px-2 py-1 text-sm rounded">
                You've already applied to this job
              </span>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
