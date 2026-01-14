import express from "express";
import {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getMonthlyTotal,
    getCategorySummary,
} from "../controllers/expense.controller.js";
import protect from "../middlewares/auth.middleware.js";
import captureLocation from "../middlewares/location.middleware.js";



const router = express.Router();

// Protected routes
router.post("/", protect, addExpense);
router.get("/", protect, getExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/monthly/total", protect, getMonthlyTotal);
router.get("/summary/category", protect, getCategorySummary);
router.post("/expenses", protect, captureLocation, createExpense);


export default router;

