import express from "express";
import {
  addOrder,
  displayOrder,
  displayAllOrders,
  updatePaymentMethod,
} from "../controllers/order.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const orderRouter = express.Router();

orderRouter.post("/add-order", verifyToken, addOrder);
orderRouter.get("/display-order", verifyToken, displayOrder);
orderRouter.get("/display-all-order", verifyToken, displayAllOrders);
orderRouter.put("/update-payment-method/:id", verifyToken, updatePaymentMethod);

export { orderRouter };
