import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { errorHandler } from "../utils/errorHandler.utility.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.replace("Bearer ", "");
    if (!token) {
        return next(new errorHandler("Invalid token", 400));
    }

    let tokenData;
    try {
        tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return next(new errorHandler("Token is invalid or expired", 401));
    }

    const user = await User.findById(tokenData._id);
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    req.user = user;
    next();
});
