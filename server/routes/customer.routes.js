import express from "express";
import {
  regCustomer,
  displayCustomer,
} from "../controllers/customer.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const customerRouter = express.Router();

customerRouter.post("/register/customer", regCustomer);
customerRouter.get("/display/customer", verifyToken, displayCustomer);

export { customerRouter };
