import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


// ======================
// REGISTER USER
// ======================
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json(
        new ApiResponse(
            201,
            {
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            },
            "User registered successfully"
        )
    );
});


// ======================
// LOGIN USER
// ======================
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            {
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            },
            "Login successful"
        )
    );
});


// ======================
// GET PROFILE (PROTECTED)
// ======================
const getProfile = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User profile fetched successfully"
        )
    );
});


export {
    registerUser,
    loginUser,
    getProfile,
};