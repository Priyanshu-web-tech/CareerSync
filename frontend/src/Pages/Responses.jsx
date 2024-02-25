import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


import TableSkeleton from "../skeletonComponents/TableSkeleton";

const Responses = () => {
  const theme = useSelector((state) => state.theme);
  const [applied, setApplied] = useState([]);
  const [jobs, setJobs] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [isloading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${window.location.origin}/api/user/get-users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/apply/appliedJobs")
      .then((res) => res.json())
      .then((data) => {
        setApplied(data);
        setIsLoading(false);
      });
  }, [currentUser._id]);

  useEffect(() => {
    fetch(`/api/job/myJobs/${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  // Filter applied jobs
  const filteredJobs = applied
    .map((appliedJob) => {
      const matchingJob = jobs.find((job) => job._id === appliedJob.job);
      if (matchingJob) {
        return { ...appliedJob, jobDetails: matchingJob };
      }
      return null; // If matchingJob is undefined, return null or handle it accordingly
    })
    .filter(Boolean);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  //   next btn and previous btn
  const nextPage = () => {
    if (indexOfLastItem < jobs.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <motion.div
    initial={{  y: -50 }}
      animate={{  y: 0 }}
      exit={{  y: -50 }}
      transition={{ duration: 0.5 }}
      className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 p-3 min-h-screen ${
        theme.darkMode ? "dark:bg-slate-700 text-neutral-200" : ""
      }`}
    >
      <PageHeader title={"Responses"} path={"responses"} />

      {/* Table */}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div
            className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
              theme.darkMode ? "dark:bg-slate-800 text-white" : "bg-white"
            } `}
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-center text-blueGray-700">
                    Job Responses
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              {isloading ? (
                <TableSkeleton/>
              ) : (
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        NO.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        TITLE
                      </th>

                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        NAME
                      </th>

                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        RESUME LINK
                      </th>

                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        E-MAIL
                      </th>

                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        APPLICATION DATE
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentJobs.map((job, index) => {
                      const matchingUser = users.find(
                        (user) => user._id === job.user
                      );

                      return (
                        <tr key={index}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                            {index + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {job.jobDetails ? job.jobDetails.jobTitle : ""}{" "}
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {matchingUser ? matchingUser.name : ""}{" "}
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {matchingUser && matchingUser.resume ? (
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue"
                                href={matchingUser.resume}
                              >
                                Resume
                              </a>
                            ) : (
                              <span>No Resume Listed</span>
                            )}
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {matchingUser ? matchingUser.email : ""}{" "}
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {job.appliedDate.slice(0, 10)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* pagination */}
        <div className="flex justify-center  space-x-8 mb-8">
          {currentPage > 1 && (
            <button onClick={prevPage} className="hover:underline">
              Previous
            </button>
          )}

          {indexOfLastItem < filteredJobs.length && (
            <button onClick={nextPage} className="hover:underline">
              Next
            </button>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Responses;
