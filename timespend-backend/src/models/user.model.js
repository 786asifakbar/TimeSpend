import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required "],
        },
        isPro: {
            type: Boolean,
            default: false
        }

    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);