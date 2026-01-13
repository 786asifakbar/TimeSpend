import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        plan: {
            type: String,
            enum: ["free", "pro"],
            default: "free",
        },
        paymentMethod: {
            type: String,
            enum: ["jazzcash", "easypaisa", "bank"],
        },
        transactionId: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "active", "rejected"],
            default: "pending",
        },
        expiresAt: Date,
    },
    { timestamps: true }
);

export const Subscription = mongoose.model(
    "Subscription",
    subscriptionSchema
);