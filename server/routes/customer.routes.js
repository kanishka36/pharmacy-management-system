import express from "express";
import { regCustomer } from "../controllers/customer.controller.js";
const customerRouter = express.Router();

customerRouter.post("/register/customer", regCustomer);

export { customerRouter };
