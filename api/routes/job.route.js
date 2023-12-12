import express from "express";
import { createJob, deleteJob, getJobEmail, getJobId, getJobs, updateJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post-job",createJob);
router.patch("/update-job/:id",updateJob);
router.get("/myJobs/:email",getJobEmail);
router.delete("/delete/:id",deleteJob);
router.get("/all-jobs/:id",getJobId);
router.get("/all-jobs",getJobs);

export default router;
