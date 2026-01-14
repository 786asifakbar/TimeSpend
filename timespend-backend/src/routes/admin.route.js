import express from "express";
import { markUserPro } from "../controllers/admin.controller.js";
import protect from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";

const router = express.Router();

router.put("/make-pro/:userId", protect, adminOnly, markUserPro);

export default router;