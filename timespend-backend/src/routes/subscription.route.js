import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { requestProSubscription } from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/pro", protect, requestProSubscription);

export default router;