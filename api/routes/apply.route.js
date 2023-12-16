import express from "express";
import { applyJob, getAppliedId } from "../controllers/apply.controller.js";

const router = express.Router();

router.post("/apply-job",applyJob);
router.get("/appliedJobs/:id",getAppliedId);



export default router;
