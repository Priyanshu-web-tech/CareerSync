import express from "express";
import { applyJob, getAppliedId,getApplied } from "../controllers/apply.controller.js";

const router = express.Router();

router.post("/apply-job",applyJob);
router.get("/appliedJobs/:id",getAppliedId);
router.get("/appliedJobs",getApplied);




export default router;
