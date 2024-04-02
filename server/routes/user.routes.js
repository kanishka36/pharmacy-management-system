import express from "express";
import { regUser } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/register/user", regUser);

export { userRouter };
