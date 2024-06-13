import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: [true, "Please add a header"],
    },
    body: {
      type: String,
      required: [true, "Please add a body"],
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

export default News;
