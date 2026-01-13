import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.model.js";
import { TimeLog } from "../models/timelog.model.js";

const getMonthlyReport = asyncHandler(async (req, res) => {
    const { year, month } = req.query;
    const userId = req.user._id;

    // validation
    if (!year || !month) {
        return res.status(400).json(
            new ApiResponse(400, null, "Year and month are required")
        );
    }

    // date range
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // expenses
    const expenses = await Expense.find({
        user: userId,
        date: { $gte: startDate, $lte: endDate },
    });

    // time logs
    const timeLogs = await TimeLog.find({
        user: userId,
        date: { $gte: startDate, $lte: endDate },
    });

    const totalExpense = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const totalTime = timeLogs.reduce(
        (sum, item) => sum + item.minutes,
        0
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                month,
                year,
                totalExpense,
                totalTime,
                expenses,
                timeLogs,
            },
            "Monthly report generated successfully"
        )
    );
});
export { getMonthlyReport };