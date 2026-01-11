import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("TimeSpend Backend is running 🚀");
});

app.use("/api/users", userRoutes);

export default app;