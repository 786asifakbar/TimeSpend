import { Subscription } from "../models/subscription.model.js";
import asyncHandler from "../utills/asyncHandler.js";

const approveSubscription = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const sub = await Subscription.findById(id);

    sub.status = "active";
    sub.expiresAt = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
    );

    await sub.save();

    res.json({ message: "Subscription approved" });
});

export { approveSubscription };