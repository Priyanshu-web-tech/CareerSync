import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../components/Sidebar/Sidebar";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // handle input change
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  //filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // -------------------Radio-----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // -----------Button filtering------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    return { startIndex, endIndex };
  };

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main functions
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }
    // category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          if (selected.includes("-")) return postingDate >= selected;
          else {
            return (
              parseInt(maxPrice) <= parseInt(selected) ||
              jobLocation.toLowerCase() === selected.toLowerCase() ||
              salaryType.toLowerCase() === selected.toLowerCase() ||
              employmentType.toLowerCase() === selected.toLowerCase() ||
              experienceLevel.toLowerCase() === selected.toLowerCase()
            );
          }
        }
      );
    }

    // Slice the data ,based on current Page

    const { startIndex, endIndex } = calculatePageRange();

    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);
  console.log(result);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* Left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Job Cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No Data Found !</p>
            </>
          )}

          {/* Pagination */}

          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                disabled={currentPage === 1}
                className="hover:underline"
                onClick={prevPage}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {result.length < 6
                  ? Math.ceil(result.length / itemsPerPage)
                  : Math.ceil(filteredItems.length / itemsPerPage)}
              </span>

              <button
                onClick={nextPage}
                disabled={
                  result.length < 6 ||
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Right side */}
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
