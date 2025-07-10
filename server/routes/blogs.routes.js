import express from "express";
import {
    commentOnBlog,
    createBlog,
    deleteBlog,
    deleteComment,
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
router.get("/:id", getBlogById);
router.post("/create-blog", isAuthenticated, createBlog);
router.put("/:id/update", isAuthenticated, updateBlog);
router.delete("/:id/delete", isAuthenticated, deleteBlog);
router.get("/search-blogs", searchBlogs);

// Other routes
router.post("/:id/comment", isAuthenticated, commentOnBlog);
router.delete("/:blogId/comment/:commentId", isAuthenticated, deleteComment);
router.put("/:id/like", isAuthenticated,likeBlog);
router.post("/:id/view", incrementViewCount);

export default router;