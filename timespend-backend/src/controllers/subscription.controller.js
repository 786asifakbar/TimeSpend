import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";

const requestProSubscription = asyncHandler(async (req, res) => {
    const { paymentMethod, transactionId } = req.body;

    if (!paymentMethod || !transactionId) {
        return res.status(400).json(
            new ApiResponse(400, null, "Payment details required")
        );
    }

    const subscription = await Subscription.create({
        user: req.user._id,
        plan: "pro",
        paymentMethod,
        transactionId,
        status: "pending",
    });

    res.status(201).json(
        new ApiResponse(
            201,
            subscription,
            "Subscription request submitted, awaiting approval"
        )
    );
});

export { requestProSubscription };