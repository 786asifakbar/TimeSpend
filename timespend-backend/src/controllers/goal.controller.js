import { Goal } from "../models/goal.model.js";
import { Expense } from "../models/expense.model.js";
import { TimeLog } from "../models/timelog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// ➕ Create Goal
const createGoal = asyncHandler(async (req, res) => {
    const { type, category, limit, duration } = req.body;

    if (!type || !limit) {
        throw new ApiError(400, "Type and limit are required");
    }

    const goal = await Goal.create({
        user: req.user._id,
        type,
        category,
        limit,
        duration,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, goal, "Goal created"));
});

// 📊 Goal Progress
const getGoalProgress = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user._id });

    let results = [];

    for (const goal of goals) {
        let used = 0;

        if (goal.type === "expense") {
            const expenses = await Expense.find({ user: req.user._id });
            used = expenses.reduce((sum, e) => sum + e.amount, 0);
        }

        if (goal.type === "time") {
            const logs = await TimeLog.find({ user: req.user._id });
            used = logs.reduce((sum, l) => sum + l.minutes, 0);
        }

        results.push({
            goal,
            used,
            remaining: goal.limit - used,
            status: used > goal.limit ? "exceeded" : "on-track",
        });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, results, "Goal progress calculated"));
});

export { createGoal, getGoalProgress };