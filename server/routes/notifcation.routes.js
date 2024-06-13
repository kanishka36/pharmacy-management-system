import express from "express";
import {
  addNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/add-notification", addNotification);
router.put("/update-notification/:id", updateNotification);
router.delete("/delete-notification/:id", deleteNotification);

export default router;
