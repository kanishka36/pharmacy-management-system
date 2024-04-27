import express from "express";
import {
  regUser,
  loginUser,
  displayUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
const userRouter = express.Router();
import { verifyToken } from "../utils/verifyUser.js";

userRouter.post("/register/user", verifyToken, regUser);
userRouter.post("/login", loginUser);
userRouter.get("/display-staff", verifyToken, displayUser);
userRouter.put("/update-staff/:id", verifyToken, updateUser);
userRouter.get("/delete-staff/:id", verifyToken, deleteUser);

export { userRouter };
