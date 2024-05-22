import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  maxPrice: {
    type: String,
    required: true,
  },
  minPrice: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  postingDate: {
    type: String,
    required: true,
    default: function () {
      const currentDate = new Date().toISOString().split("T")[0];
      return currentDate;
    },
  },
  salaryType: {
    type: String,
    required: true,
  },
  skills: [
    {
      value: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ],
  creatAt: {
    type: Date,
    default: Date.now,
  },
});

const demoJobs = mongoose.model("demoJobs", jobSchema);

export default demoJobs;
