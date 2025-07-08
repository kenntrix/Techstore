import express from "express";
import { getDashboardStats } from "../controller/dashboard.controller.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/dashboard", verifyToken, verifyAdmin, getDashboardStats);

export default router;
