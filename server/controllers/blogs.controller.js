import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { errorHandler } from "../utils/errorHandler.utility.js";

// Get all blogs
export const getAllBlogs = asyncHandler(async (req, res, next) => {
    const blogs = await User.find({}, "title author createdAt").sort({ createdAt: -1 });
    res
        .status(200)
        .json({
            success: true,
            responseData: blogs
        });
});

// Get a single blog
export const getBlogById = asyncHandler(async (req, res, next) => {
    const blog = await User.findById(req.params.id, "title content author createdAt");
    if (!blog) {
        return next(new errorHandler("Blog not found", 404));
    }
    res
        .status(200)
        .json({
            success: true,
            responseData: blog
        });
});

// Create a new blog
export const createBlog = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    const blog = await User.create({...req.body, author: user._id });
    res
        .status(201)
        .json({
            success: true,
            responseData: blog
        });
});

// Update a blog
export const updateBlog = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    const blog = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) {
        return next(new errorHandler("Blog not found", 404));
    }
    res
        .status(200)
        .json({
            success: true,
            responseData: blog
        });
});

// Delete a blog
export const deleteBlog = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    const blog = await User.findByIdAndDelete(req.params.id);
    if (!blog) {
        return next(new errorHandler("Blog not found", 404));
    }
    res
        .status(200)
        .json({
            success: true,
            responseData: blog
        });
});

// Comment on a blog
export const commentOnBlog = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    const blog = await User.findByIdAndUpdate(req.params.id, { $push: { comments: req.body } }, { new: true, runValidators: true });
    if (!blog) {
        return next(new errorHandler("Blog not found", 404));
    }
    res
        .status(200)
        .json({
            success: true,
            responseData: blog
        });
});

// Like a blog
export const likeBlog = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    const blog = await User.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } }, { new: true, runValidators: true });
    if (!blog) {
        return next(new errorHandler("Blog not found", 404));
    }
    res
        .status(200)
        .json({
            success: true,
            responseData: blog
        });
});

// Search for blogs by author or title
export const searchBlogs = asyncHandler(async (req, res, next) => {
    const keyword = req.query.keyword.toLowerCase();
    const blogs = await User.find({
        $or: [{ author: { $regex: keyword, $options: "i" } }, { title: { $regex: keyword, $options: "i" } }],
    }, "title author createdAt").sort({ createdAt: -1 });
    res
        .status(200)
        .json({
            success: true,
            responseData: blogs
        });
});

// Increment a blog's view count
export const incrementViewCount = asyncHandler(async (req, res, next) => {
    const blog = await User.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } }, { new: true, runValidators: true });
    if (!blog) {
        return next(new errorHandler("Blog not found", 404));
    }
    res
        .status(200)
        .json({
            success: true,
            responseData: blog
        });
});