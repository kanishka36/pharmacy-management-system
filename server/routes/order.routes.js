import express from "express";
import { addOrder, displayOrder } from "../controllers/order.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const orderRouter = express.Router();

orderRouter.post("/add-order", verifyToken, addOrder);
orderRouter.get("/display-order", verifyToken, displayOrder);

export { orderRouter };
