import Application from "../models/applications.model.js";
import { errorHandler } from "../utils/error.js";

export const applyJob = async (req, res, next) => {
  try {
    const body = req.body;

    const appliedJob = await Application.create(body);

    const response = {
      acknowledged: true,
      appliedJob,
    };
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAppliedId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const appliedJob = await Application.find({
        user: id,
    });
    if (!appliedJob) {
      return next(errorHandler(404, "Jobs not found!"));
    }

    res.status(200).json(appliedJob);
  } catch (error) {
    next(error);
  }
};

export const getApplied = async (req, res, next) => {
  try {
    const appliedJob = await Application.find();
    if (!appliedJob) {
      return next(errorHandler(404, "Jobs not found!"));
    }

    res.status(200).json(appliedJob);
  } catch (error) {
    next(error);
  }
};

