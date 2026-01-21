import express from "express";
import{ registerUser,loginUser,getProfile } from "../controllers/user.controller.js";

import protect from "../middlewares/auth.middleware.js";
import captureLocation from "../middlewares/location.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
//router.post("/login", loginUser);
router.post("/login", captureLocation, loginUser);

// Protected
router.get("/profile", protect, getProfile);


export default router;
