import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import {
  createUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserProfileById,
  updateUserProfile,
  updateUserByAdmin,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/create-user-profile", verifyToken, createUserProfile);
router.get("/getUserProfile/:authId", verifyToken, getUserProfileById);
router.put("/update", verifyToken, updateUserProfile);
router.put("/admin/user/:id", verifyToken, verifyAdmin, updateUserByAdmin);
router.delete("/delete/:id", verifyToken, deleteUserProfile);
router.get("/getUsers", verifyToken, verifyAdmin, getAllUsers);

export default router;
