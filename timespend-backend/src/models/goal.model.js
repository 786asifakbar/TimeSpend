import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["expense", "time"],
            required: true,
        },
        category: {
            type: String,
            default: "overall",
        },
        limit: {
            type: Number,
            required: true,
        },
        duration: {
            type: String,
            enum: ["daily", "weekly", "monthly"],
            default: "monthly",
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Goal = mongoose.model("Goal", goalSchema);