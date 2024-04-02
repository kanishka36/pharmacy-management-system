import express from "express";
import {
  regCustomer,
  loginCustomer,
} from "../controllers/customer.controller.js";
const customerRouter = express.Router();

customerRouter.post("/register/customer", regCustomer);
customerRouter.post("/login/customer", loginCustomer);

export { customerRouter };
