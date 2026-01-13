import mongoose from "mongoose";

const timeLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        activity: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ["work", "learning", "social", "sleep", "mobile", "other"],
            default: "other",
        },
        minutes: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const TimeLog = mongoose.model("TimeLog", timeLogSchema);