import express from "express";
import { deleteUser, getProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-profile", isAuthenticated, getProfile);
router.put("/update-profile", isAuthenticated, updateProfile);
router.post("/logout", isAuthenticated, logout);
router.delete("/delete-account", isAuthenticated, deleteUser);

export default router;
