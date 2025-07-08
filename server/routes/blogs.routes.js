import express from "express";
import {
    commentOnBlog,
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
    incrementViewCount,
    likeBlog,
    searchBlogs,
    updateBlog
} from "../controllers/blogs.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Blog routes
router.get("/", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.post("/create-blog", isAuthenticated, createBlog);
router.put("/blog/:id/update", isAuthenticated, updateBlog);
router.delete("/blog/:id/delete", isAuthenticated, deleteBlog);
router.get("/search-blogs", searchBlogs);

// Other routes
router.post("/blog/:d/comment", isAuthenticated, commentOnBlog);
router.post("/blog/:id/like", likeBlog);
router.post("/blog/:id/view", incrementViewCount);

export default router;