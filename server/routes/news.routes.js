import express from "express";
import {
  addNews,
  updateNews,
  deleteNews,
  displayNews,
} from "../controllers/news.controller.js";

const newsRouter = express.Router();

newsRouter.post("/add-news", addNews);
newsRouter.get("/display-news", displayNews);
newsRouter.put("/update-news/:id", updateNews);
newsRouter.delete("/delete-news/:id", deleteNews);

export { newsRouter };
