import geoip from "geoip-lite";
import asyncHandler from "../utils/asyncHandler.js";
import { Location } from "../models/location.model.js";

const captureLocation = asyncHandler(async (req, res, next) => {
    // get user IP
    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress ||
        req.ip;

    const geo = geoip.lookup(ip);

    if (geo && req.user) {
        await Location.create({
            user: req.user._id,
            ip,
            country: geo.country,
            city: geo.city,
            region: geo.region,
        });
    }

    next();
});

export default captureLocation;