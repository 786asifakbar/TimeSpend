import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        plan: {
            type: String,
            enum: ["free", "pro"],
            default: "free",
        },
        expiresAt: Date,
    },
    { timestamps: true }
);

export const Subscription = mongoose.model(
    "Subscription",
    subscriptionSchema
);