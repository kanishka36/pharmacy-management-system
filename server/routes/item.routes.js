import express from "express";
import { addItem, displayItem } from "../controllers/item.controller.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", addItem);
itemRouter.get("/display-item", displayItem);

export { itemRouter };
