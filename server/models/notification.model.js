import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Please add a body"],
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
