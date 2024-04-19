import express from "express";
import { regUser, loginUser } from "../controllers/user.controller.js";
const userRouter = express.Router();
import { verifyToken } from "../utils/verifyUser.js";

userRouter.post("/register/user", verifyToken, regUser);
userRouter.post("/login", loginUser);

export { userRouter };
