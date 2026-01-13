import express from "express";
import protect from "../middlewares/auth.middleware.js";
import checkPro from "../middlewares/checkPro.middleware.js";
import { getMonthlyReport } from "../controllers/report.controller.js";

const router = express.Router();

router.get("/monthly", protect, checkPro, getMonthlyReport);

export default router;