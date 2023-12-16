import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useSelector } from "react-redux";

const SalaryPage = () => {
  const theme = useSelector((state) => state.theme);

  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    fetch("salary.json")
      .then((res) => res.json())
      .then((data) => setSalary(data));
  }, [searchText]);

  const handleSearch = () => {
    const filter = salary.filter(
      (job) => job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    console.log(filter);

    setSalary(filter);
  };
  return (
    <div className={`max-w-screen-2xl container max-auto xl:px-24 px-4 min-h-screen ${
      theme.darkMode ? "dark:bg-slate-800 text-neutral-200" : ""
    }`}>
      <PageHeader title={"Estimate Salary"} path={"Salary"} />

      <div className="mt-5 ">
        <div className="search-box p-2 text-center mb-2">
          <input
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
          />

          <button
            onClick={handleSearch}
            className="bg-teal-600  font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>
      </div>

      {/* salary display card */}
      <div className="grid p-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12  items-center">

        {salary.map((data) => (
          <div key={data.id} className={` rounded shadow px-4 py-8 ${
            theme.darkMode ? "dark:bg-slate-700" : ""
          }`}>
            <h4 className="font-semibold text-xl">{data.title}</h4>
            <p className="my-2 font-medium text-teal-600 text-lg">{data.salary}</p>
            <div className="flex flex-wrap gap-4">
              <a href="/" className="underline">
                {data.status}
              </a>

              <a href="/" className="underline">
                {data.skills}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryPage;
