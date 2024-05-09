import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/user.routes.js";
import { customerRouter } from "./routes/customer.routes.js";
import { itemRouter } from "./routes/item.routes.js";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import { prescriptionRouter } from "./routes/prescription.routes.js";
import { cartRouter } from "./routes/cart.routes.js";

dotenv.config();
// const PORT = process.env.PORT || 5000;
const PORT = 3005;

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://pharmacy-management-system-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res)=> {
  res.json("Hello")
})

// app.use(userRouter);
app.use(customerRouter);
app.use(itemRouter);
app.use(prescriptionRouter);
app.use(cartRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
