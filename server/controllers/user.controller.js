import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { errorHandler } from "../utils/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register a new user
export const register = asyncHandler(async (req, res, next) => {
    const { fullName, username, password } = req.body;
    console.log("Incoming registration:", fullName, username, password);

    if (!fullName || !username || !password ) {
        return next(new errorHandler("All fields are required", 400));
    }

    const user = await User.findOne({ username });
    if (user) {
        return next(new errorHandler("User already exists", 400));
    }

    console.log("Proceeding to hash:", password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const avatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}&radius=50&backgroundColor[]&backgroundType=gradientLinear&backgroundRotation=0,360,260&randomizeIds=true&eyebrows=angryNatural,default,defaultNatural,flatNatural,frownNatural,raisedExcited,raisedExcitedNatural,sadConcernedNatural,unibrowNatural,upDown,upDownNatural&eyes=closed,default,eyeRoll,happy,hearts,side,squint,surprised,wink,winkWacky&mouth=default,disbelief,grimace,serious,smile,tongue,twinkle&skinColor=ae5d29,d08b5b,edb98a,f8d25c,fd9841,ffdbb4,614335&style=circle&top=bigHair,bob,curly,curvy,dreads,dreads01,dreads02,fro,froBand,hat,longButNotTooLong,miaWallace,shaggy,shaggyMullet,shavedSides,shortCurly,shortFlat,shortRound,shortWaved,straight01,straight02,straightAndStrand,theCaesar,theCaesarAndSidePart`;

    const newUser = await User.create({
        username,
        fullName,
        password: hashedPassword,
        avatar,
    });

    const tokenData = {
        _id: newUser?._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });

    res
        .status(200)
        .cookie("token", token, {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === "production"? "none" : "Lax",
        })
        .json({
            success: true,
            responseData: {
                newUser,
                token,
            },
        });
});


// Login a user
export const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(
            new errorHandler("Please enter a valid username or password", 400)
        );
    }

    const user = await User.findOne({ username });
    if (!user) {
        return next(
            new errorHandler("Please enter a valid username or password", 400)
        );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return next(
            new errorHandler("Please enter a valid username or password", 400)
        );
    }

    const tokenData = {
        _id: user?._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });

    res
        .status(200)
        .cookie("token", token, {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
        })
        .json({
            success: true,
            responseData: {
                user,
                token,
            },
        });
});


// Get user profile
export const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    if(!userId) return next(new errorHandler("User not found", 400))
    const profile = await User.findById(userId);
    res
        .status(200)
        .json({
        success: true,
        responseData: profile,
    });
});


// Update user profile
export const updateProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { fullName, username } = req.body;
    const user = await User.findByIdAndUpdate(
        userId,
        { fullName, username },
        { new: true }
    );
    res
        .status(200)
        .json({
            success: true,
            message: "Profile updated",
            responseData: user,
    });
});

// Delete a user account
export const deleteUser = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Account deleted successfully",
        });
});