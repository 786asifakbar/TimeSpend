import axios from "axios";
import asyncHandler from "../utils/asyncHandler.js";
import { Location } from "../models/location.model.js";

const captureLocation = asyncHandler(async (req, res, next) => {
    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

    // free IP lookup service
    const { data } = await axios.get(
        `http://ip-api.com/json/${ip}`
    );

    if (data?.status === "success") {
        await Location.create({
            user: req.user?._id,
            ip,
            country: data.country,
            city: data.city,
            region: data.regionName,
            isp: data.isp,
        });
    }

    next();
});

export default captureLocation;
