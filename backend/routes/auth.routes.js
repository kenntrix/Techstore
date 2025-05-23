import express from "express";
import {
  signin,
  signout,
  signup,
  updateUser,
} from "../controller/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.put("/update", verifyToken, updateUser);

export default router;
