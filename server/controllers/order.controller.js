import asyncHandler from "express-async-handler";
import Order from '../models/order.model.js';
import Cart from "../models/cart.model.js";

const addOrder = asyncHandler(async (req, res) => {
  const cartItems = req.body; // assuming req.body contains an array of cart items
  const customerId = req.user.userId;

  try {
    if (!cartItems || cartItems.length === 0) {
      return res
        .status(400)
        .json({ error: "Please provide cart items" });
    }

    // Map the cart items to extract their IDs
    const cartItemIds = cartItems.map(item => item._id);

    // Create a new order with the cart item IDs
    await Order.create({
      cartItems: cartItemIds,
      status: "pending payment",
      customerId,
    });

    // Respond with a success message
    res.status(200).json({ message: "Order added Successfully" });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display order
const displayOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error during order display:", error);
  }
});

export { addOrder, displayOrder };
