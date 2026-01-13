// middleware/checkPro.js
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const checkPro = asyncHandler(async (req, res, next) => {
    const sub = await Subscription.findOne({ user: req.user._id });

    if (!sub || sub.plan !== "pro") {
        throw new ApiError(403, "Upgrade to Pro to access this feature");
    }

    next();
});

export default checkPro;
