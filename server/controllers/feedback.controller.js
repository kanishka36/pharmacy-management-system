import asyncHandler from "express-async-handler";
import Feedback from "../models/feedback.model.js";

//add
const addFeedback = asyncHandler(async (req, res) => {
  const { header, body } = req.body;

  const feedback = new Feedback({ header, body });

  try {
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//display
const displayFeedback = asyncHandler(async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).send(feedback);
  } catch (error) {
    console.error("Error during display feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { addFeedback, displayFeedback };
