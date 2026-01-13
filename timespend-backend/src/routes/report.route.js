import express from "express";
import { getMonthlyReport } from "../controllers/report.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/monthly", protect, getMonthlyReport);

export default router;