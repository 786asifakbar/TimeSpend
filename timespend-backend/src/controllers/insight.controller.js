import { Expense } from "../models/expense.model.js";
import { TimeLog } from "../models/timelog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const getInsights = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId });
    const timeLogs = await TimeLog.find({ user: userId });

    let insights = [];

    let timeByCategory = {};
    let expenseByCategory = {};

    // ⏱ Time aggregation
    timeLogs.forEach((log) => {
        timeByCategory[log.category] =
            (timeByCategory[log.category] || 0) + log.minutes;
    });

    // 💸 Expense aggregation
    expenses.forEach((exp) => {
        expenseByCategory[exp.category] =
            (expenseByCategory[exp.category] || 0) + exp.amount;
    });

    // 🔍 Rule-based insights
    if (
        timeByCategory.mobile > 300 &&
        expenseByCategory.shopping > 5000
    ) {
        insights.push({
            type: "warning",
            message:
                "High mobile usage is linked with increased shopping expenses.",
        });
    }

    if (
        timeByCategory.social > 240 &&
        expenseByCategory.food > 3000
    ) {
        insights.push({
            type: "info",
            message:
                "Social activities are increasing your food spending.",
        });
    }

    if (!insights.length) {
        insights.push({
            type: "positive",
            message: "Your spending and time usage look balanced 👍",
        });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, insights, "Insights generated"));
});

export { getInsights };