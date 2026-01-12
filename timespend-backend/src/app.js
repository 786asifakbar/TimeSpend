import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// ======================
// ROUTES
// ======================
app.get("/", (req, res) => {
    res.send("TimeSpend Backend is running 🚀");
});

app.use("/api/v1/users", userRoutes);

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
    });
});

export default app;