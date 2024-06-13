import express from "express";
import {
  addNotification,
  updateNotification,
  deleteNotification,
  displayNotification,
} from "../controllers/notification.controller.js";

const NotificatonRouter = express.Router();

NotificatonRouter.post("/add-notification", addNotification);
NotificatonRouter.get("/display-notification", displayNotification);
NotificatonRouter.put("/update-notification/:id", updateNotification);
NotificatonRouter.delete("/delete-notification/:id", deleteNotification);

export {NotificatonRouter};
