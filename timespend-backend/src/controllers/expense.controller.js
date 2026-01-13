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

// ✏️ Update Expense
const updateExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    const expense = await Expense.findById(id);

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    // Security check
    if (expense.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to update this expense");
    }

    expense.title = title ?? expense.title;
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.date = date ?? expense.date;

    await expense.save();

    return res
        .status(200)
        .json(new ApiResponse(200, expense, "Expense updated successfully"));
});

// 🗑 Delete Expense
const deleteExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to delete this expense");
    }

    await expense.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Expense deleted successfully"));
});

// 📊 Monthly Total
const getMonthlyTotal = asyncHandler(async (req, res) => {
    const { year, month } = req.query;

    if (!year || !month) {
        throw new ApiError(400, "Year and month are required");
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const result = await Expense.aggregate([
        {
            $match: {
                user: req.user._id,
                date: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ]);

    const total = result.length ? result[0].total : 0;

    return res
        .status(200)
        .json(new ApiResponse(200, { total }, "Monthly total calculated"));
});

// 📈 Category Summary
const getCategorySummary = asyncHandler(async (req, res) => {
    const summary = await Expense.aggregate([
        { $match: { user: req.user._id } },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" },
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, summary, "Category summary fetched"));
});

export {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getMonthlyTotal,
    getCategorySummary,


};