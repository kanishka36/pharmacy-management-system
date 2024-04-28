import express from "express";
import {
  addCart,
  displayCart,
  deleteCart,
  updateCart,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const cartRouter = express.Router();

cartRouter.post("/add-cart", verifyToken, addCart);
cartRouter.get("/display-cart", verifyToken, displayCart);
cartRouter.delete("/delete-cart/:id", verifyToken, deleteCart);
cartRouter.put("/update-cart", verifyToken, updateCart);

export { cartRouter };
