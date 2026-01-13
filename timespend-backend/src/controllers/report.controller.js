import { Expense } from "../models/expense.model.js";
import { TimeLog } from "../models/timelog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getMonthlyReport = asyncHandler(async (req, res) => {
    const { year, month } = req.query;
    const userId = req.user._id;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const expenses = await Expense.find({
        user: userId,
        date: { $gte: start, $lte: end },
    });

    const timeLogs = await TimeLog.find({
        user: userId,
        date: { $gte: start, $lte: end },
    });

    const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
    const totalTime = timeLogs.reduce((s, t) => s + t.minutes, 0);

    return res.status(200).json(
        new ApiResponse(200, {
            totalExpense,
            totalTime,
            expenses,
            timeLogs,
        }, "Monthly report generated")
    );
});

export { getMonthlyReport };