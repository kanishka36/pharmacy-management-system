import express from "express";
import {
  regUser,
  loginUser,
  displayUser,
  updateUser,
  deleteUser,
  searchUser,
  logout,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.post("/register/user", verifyToken, regUser);
userRouter.post("/login", loginUser);
userRouter.get("/display-staff", verifyToken, displayUser);
userRouter.put("/update-staff/:id", verifyToken, updateUser);
userRouter.get("/delete-staff/:id", verifyToken, deleteUser);
userRouter.post("/search-staff", verifyToken, searchUser);
userRouter.post("/logout", logout);

export { userRouter };
