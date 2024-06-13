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
import md5 from "md5";
import { orderRouter } from "./routes/order.routes.js";
import { newsRouter } from "./routes/news.routes.js";
import { NotificatonRouter } from "./routes/notifcation.routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.get("/", (req, res)=> {
//   res.json("Hello")
// })

app.post("/generate-hash", (req, res) => {
  const { merchant_id, order_id, amount, currency } = req.body;
  const merchant_secret =
    "Mjg0NTQ2OTA3NjEwMzQ4NjgwMzI3NDQzOTkwMTEyNDM2MjQxMzE5";

  const hash = md5(
    merchant_id +
      order_id +
      Number(amount).toFixed(2) +
      currency +
      md5(merchant_secret).toUpperCase()
  ).toUpperCase();

  res.json({ hash });
});

app.use(userRouter);
app.use(customerRouter);
app.use(itemRouter);
app.use(prescriptionRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(newsRouter);
app.use(NotificatonRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
