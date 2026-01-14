import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ip: String,
        country: String,
        city: String,
        region: String,
        isp: String,
    },
    { timestamps: true }
);

export const Location = mongoose.model("Location", locationSchema);