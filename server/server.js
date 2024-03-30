import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
