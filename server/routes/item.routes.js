import express from "express";
import {
  addItem,
  displayItem,
  deleteItem,
  updateItem,
  searchItem,
  addCategory,
  displayCategory,
  updateCategory,
  deleteCategory
} from "../controllers/item.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", verifyToken, addItem);
itemRouter.get("/display-item", displayItem);
itemRouter.delete("/delete-item/:id", verifyToken, deleteItem);
itemRouter.put("/update-item/:id", verifyToken, updateItem);
itemRouter.get("/product-search", searchItem);
itemRouter.post("/add-category", verifyToken, addCategory);
itemRouter.get("/display-category", verifyToken, displayCategory);
itemRouter.put("/update-category/:id", verifyToken, updateCategory);
itemRouter.delete("/delete-category/:id", verifyToken, deleteCategory);

export { itemRouter };
