import demoJobs from "../models/job.model.js";
import { errorHandler } from "../utils/error.js";

export const createJob = async (req, res, next) => {
  try {
    const body = req.body;
    body.createAt = new Date();

    const job = await demoJobs.create(body);

    const response = {
      acknowledged: true,
      job,
    };
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  const job = await demoJobs.findById(req.params.id);
  const jobData = req.body;

  if (!job) {
    return next(errorHandler(404, "Job not found!"));
  }

  try {
    const updatedJob = await demoJobs.findByIdAndUpdate(
      req.params.id,
      jobData,
      { new: true }
    );

    const response = {
      acknowledged: true,
      updatedJob,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await demoJobs.find();

    if (!jobs) {
      return next(errorHandler(404, "Job not found!"));
    }

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const job = await demoJobs.findById(id);
    if (!job) {
      return next(errorHandler(404, "Job not found!"));
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const getJobEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const job = await demoJobs.find({
      postedBy: email,
    });
    if (!job) {
      return next(errorHandler(404, "Job not found!"));
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  const job = await demoJobs.findById(req.params.id);

  if (!job) {
    return next(errorHandler(404, "Job not found!"));
  }

  try {
    await demoJobs.findByIdAndDelete(req.params.id);

    const response = {
      acknowledged: true,
      message: "Job has been deleted!",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
