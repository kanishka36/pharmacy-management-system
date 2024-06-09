import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";

//add order
const addOrder = asyncHandler(async (req, res) => {
  const cartItems = req.body;
  const customerId = req.user.userId;

  try {
    if (!cartItems) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields" });
    }
      
    const cartIds = cartItems.map((item)=> item._id);

    await Order.create({
      cartIds,
      status: "pending payment",
      customerId,
    });

    // res.status(200).json({ message: "Order added Successfully" });
  } catch (error) {
    console.error("Error order adding:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display order
const displayOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Prescription.find();
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error during order display:", error);
  }
});

export { addOrder, displayOrder };
