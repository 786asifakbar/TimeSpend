import { Expense } from "../models/expense.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// ➕ Add Expense
const addExpense = asyncHandler(async (req, res) => {
    const { title, amount, category, date } = req.body;

    if (!title || !amount) {
        throw new ApiError(400, "Title and amount are required");
    }

    const expense = await Expense.create({
        user: req.user._id,
        title,
        amount,
        category,
        date,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, expense, "Expense added successfully"));
});

// 📥 Get User Expenses
const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ user: req.user._id }).sort({
        createdAt: -1,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, expenses, "Expenses fetched successfully"));
});

export { addExpense, getExpenses };