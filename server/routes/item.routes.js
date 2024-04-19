import express from "express";
import {
  addItem,
  displayItem,
  deleteItem,
  updateItem,
} from "../controllers/item.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", verifyToken, addItem);
itemRouter.get("/display-item", displayItem);
itemRouter.delete("/delete-item/:id", verifyToken, deleteItem);
itemRouter.put("/update-item/:id", verifyToken, updateItem);

export { itemRouter };
