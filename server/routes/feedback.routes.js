import express from "express";
import {
  addFeedback,
  displayFeedback,
} from "../controllers/feedback.controller.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/add-feedback", addFeedback);
feedbackRouter.get("/display-feedback", displayFeedback);

export { feedbackRouter };
