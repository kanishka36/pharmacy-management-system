import asyncHandler from "express-async-handler";
import News from "../models/news.model.js";

//add
export const addNews = asyncHandler(async (req, res) => {
  const { header, body } = req.body;

  const news = new News({ header, body });

  try {
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update
export const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { header, body } = req.body;

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { header, body },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News item not found" });
    }

    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete
export const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ message: "News item not found" });
    }

    res.status(200).json({ message: "News item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//display
const displayNews = asyncHandler(async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).send(news);
  } catch (error) {
    console.error("Error during display news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { addNews, displayNews, deleteNews, updateNews };
