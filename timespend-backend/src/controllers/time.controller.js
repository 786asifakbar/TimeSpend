import { TimeLog } from "../models/timelog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// ➕ Add Time Log
const addTimeLog = asyncHandler(async (req, res) => {
    const { activity, category, minutes, date } = req.body;

    if (!activity || !minutes) {
        throw new ApiError(400, "Activity and minutes are required");
    }

    const log = await TimeLog.create({
        user: req.user._id,
        activity,
        category,
        minutes,
        date,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, log, "Time logged successfully"));
});

// 📥 Get User Time Logs
const getTimeLogs = asyncHandler(async (req, res) => {
    const logs = await TimeLog.find({ user: req.user._id }).sort({
        createdAt: -1,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, logs, "Time logs fetched"));
});

// 📊 Productivity Score
const getProductivityScore = asyncHandler(async (req, res) => {
    const logs = await TimeLog.find({ user: req.user._id });

    let productive = 0;
    let unproductive = 0;

    logs.forEach((log) => {
        if (["work", "learning"].includes(log.category)) {
            productive += log.minutes;
        } else {
            unproductive += log.minutes;
        }
    });

    const total = productive + unproductive;
    const score = total ? Math.round((productive / total) * 100) : 0;

    return res.status(200).json(
        new ApiResponse(200, {
            productive,
            unproductive,
            score,
        }, "Productivity score calculated")
    );
});

export {
    addTimeLog,
    getTimeLogs,
    getProductivityScore,



}