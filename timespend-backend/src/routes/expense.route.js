import express from "express";
import { addExpense, getExpenses } from "../controllers/expense.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, addExpense);
router.get("/", protect, getExpenses);

export default router;