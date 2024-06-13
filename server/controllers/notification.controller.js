import asyncHandler from "express-async-handler";
import Notification from "../models/notification.model.js";

//add
const addNotification = asyncHandler(async (req, res) => {
  const { header, body } = req.body;

  const notification = new Notification({ header, body });

  try {
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update
const updateNotification = asyncHandler(async (req, res) => {
  const id = req.params;
  const { header, body } = req.body;

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { header, body },
      { new: true, runValidators: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification item not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete
const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification item not found" });
    }

    res.status(200).json({ message: "Notification item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//display
const displayNotification = asyncHandler(async (req, res) => {
  try {
    const notification = await Notification.find();
    res.status(200).send(notification);
  } catch (error) {
    console.error("Error during display notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export {
  addNotification,
  displayNotification,
  deleteNotification,
  updateNotification,
};
