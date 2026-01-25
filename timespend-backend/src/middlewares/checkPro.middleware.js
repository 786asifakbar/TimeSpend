import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Subscription } from "../models/subscription.model.js";

const checkPro = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const subscription = await Subscription.findOne({
        user: req.user._id,
        status: "active",
    });

    // if (!subscription || subscription.plan !== "pro") {
    //     throw new ApiError(
    //         403,
    //         "Upgrade to Pro to access this feature"
    //     );
    // }
    next();
});
export default checkPro;