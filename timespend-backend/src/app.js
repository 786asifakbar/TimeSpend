import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import expenseRoutes from "./routes/expense.route.js";
import timeRoutes from "./routes/time.route.js";
import insightRoutes from "./routes/insight.route.js";
import goalRoutes from "./routes/goal.route.js";
import reportRoutes from "./routes/report.route.js";
import subscriptionRoutes from "./routes/subscription.route.js";

const app = express();

// ======================
// MIDDLEWARES
// ======================
// ✅ CORS CONFIG (THIS FIXES EVERYTHING)

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: process.env.CORS_ORIGIN,
    credentials: true,
})
);

// ✅ PRE-FLIGHT SUPPORT
//app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================
// ROUTES
// ======================

app.get("/", (req, res) => {
    res.send("TimeSpend Backend is running 🚀");
});

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/time", timeRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/subscription", subscriptionRoutes);

// ======================
// GLOBAL ERROR HANDLER
// ======================

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
    })
})
export default app   