import express from "express";
import {
  addItem,
  displayItem,
  deleteItem,
} from "../controllers/item.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", verifyToken, addItem);
itemRouter.get("/display-item", displayItem);
itemRouter.delete("/delete-item/:id", deleteItem);

export { itemRouter };
