import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/user.routes.js";
import connectDB from "./config/db.config.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
