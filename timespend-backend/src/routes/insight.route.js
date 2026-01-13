import express from "express";
import { getInsights } from "../controllers/insight.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getInsights);

export default router;