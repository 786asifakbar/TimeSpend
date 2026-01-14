import express from "express";
import {
    addTimeLog,
    getTimeLogs,
    getProductivityScore,
} from "../controllers/time.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addTimeLog);
router.get("/", protect, getTimeLogs);
router.get("/productivity", protect, getProductivityScore);
router.post("/timelog", protect, captureLocation, createTimeLog);
export default router;
