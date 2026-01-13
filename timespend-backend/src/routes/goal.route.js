import express from "express";
import {
    createGoal,
    getGoalProgress,
} from "../controllers/goal.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createGoal);
router.get("/progress", protect, getGoalProgress);

export default router;