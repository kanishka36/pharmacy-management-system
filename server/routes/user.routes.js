import express from "express";
import { regUser, loginUser } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/register/user", regUser);
userRouter.post("/login", loginUser);

export { userRouter };
