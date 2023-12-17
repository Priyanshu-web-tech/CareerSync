import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";


const UpdateJob = () => {
  const theme = useSelector((state) => state.theme);
  const { id } = useParams();

  const {
    _id,
    jobTitle,
    companyLogo,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description,
    postedBy,
    skills,
  } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;

    fetch(`/api/job/update-job/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged === true) {
          Swal.fire(  {
            text: "Job Updated Successfully",
            confirmButtonColor: "teal",
            background: `${theme.darkMode ? "#1e293b" : ""}`,
            color: `${theme.darkMode ? "white" : ""}`,
          }
        );
        }
        reset({});
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Python", label: "Python" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 p-3 ${
      theme.darkMode ? "dark:bg-slate-800 text-white" : ""
    }`}>
      {/* form */}
      <div className={` py-10 px-4 lg:px-16 ${
        theme.darkMode ? "dark:bg-slate-700" : "bg-[#FAFAFA]"
      }`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                required
                type="text"
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-wh" : ""
                }`}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                required
                type="text"
                placeholder="Ex: Microsoft"
                defaultValue={companyName}
                {...register("companyName")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-white" : ""
                }`}
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                required
                type="text"
                defaultValue={minPrice}
                placeholder="$20k"
                {...register("minPrice")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-white" : ""
                }`}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                required
                type="text"
                defaultValue={maxPrice}
                placeholder="$120k"
                {...register("maxPrice")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-white" : ""
                }`}
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                required
                {...register("salaryType")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-white" : ""
                }`}
              >
                <option value={salaryType}>{salaryType} </option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                required
                type="text"
                placeholder="Ex: London"
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-white" : ""
                }`}
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Type</label>
              <select
                required
                {...register("employmentType")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-white" : ""
                }`}
              >
                <option value={employmentType}>{employmentType} </option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                required
                {...register("experienceLevel")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-white" : ""
                }`}
              >
                <option value={experienceLevel}>{experienceLevel} </option>
                <option value="No Experience">No Experience</option>
                <option value="Any Experience">Any Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets:</label>

           <CreatableSelect
              defaultValue={skills}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input"
  
              required
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: theme.darkMode ? "#2D3748" : "white", 
                  
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: theme.darkMode ? "#2D3748" : "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? (theme.darkMode ? "#4A5568" : "#D1D5DB") 
                    : (theme.darkMode ? "#2D3748" : "white"), 
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: theme.darkMode ? "#4A5568" : "#D1D5DB", 
                  color: theme.darkMode ? "white" : "black", 
                }),

                multiValueLabel: (provided) => ({
                  ...provided,
                  color: theme.darkMode ? "white" : "black", 
                }),
              }}
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                required
                type="url"
                placeholder="Paste your compnay logo URL"
                defaultValue={companyLogo}
                {...register("companyLogo")}
                className={`create-job-input ${
                  theme.darkMode ? "dark:bg-slate-800 text-white" : ""
                }`}
              />
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              required
              className={`w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-600 ${
                theme.darkMode ? "dark:bg-slate-800 text-white" : ""
              }`}
              rows={6}
              defaultValue={description}
              placeholder="Job Description"
              {...register("description")}
            ></textarea>
          </div>

          <div className="flex justify-center items-center">
            <input
              className="block hover:opacity-90 bg-teal-600 text-white font-semibold px-8 py-2 rounded cursor-pointer"
              type="submit"
              value="Update Job"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
