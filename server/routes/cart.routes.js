import express from "express";
import { addCart, displayCart } from "../controllers/cart.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const cartRouter = express.Router();

cartRouter.post("/add-cart", verifyToken, addCart);
cartRouter.get("/display-cart", verifyToken, displayCart);

export { cartRouter };
