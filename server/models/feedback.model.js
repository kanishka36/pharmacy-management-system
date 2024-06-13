import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Please add a body"],
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
