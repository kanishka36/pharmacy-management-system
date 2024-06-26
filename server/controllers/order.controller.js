import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";

const addOrder = asyncHandler(async (req, res) => {
  const { cartData: cartItems, deliveryAddress, paymentMethod } = req.body; 
  const customerId = req.user.userId;

  try {
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Please provide cart items" });
    }

    // Map the cart items to extract their IDs
    const cartItemIds = cartItems.map((item) => item._id);

    // Create a new order with the cart item IDs
    const newOrder = await Order.create({
      cartItems: cartItemIds,
      customerId,
      deliveryAddress,
      paymentMethod,
    });

    // Respond with a success message and the orderId
    res
      .status(200)
      .json({ message: "Order added Successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const displayOrder = asyncHandler(async (req, res) => {
  const customerId = req.user.userId;

  try {
    // Find orders for the customer and populate cart items
    const orders = await Order.find({ customerId }).populate({
      path: "cartItems",
      populate: {
        path: "products",
        model: "Item",
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    // Respond with the orders
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const displayAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "cartItems",
      populate: {
        path: "products",
        model: "Item",
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    // Respond with the orders
    res.status(200).json(orders);
  } catch (error) {}
});

const updatePaymentMethod = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const method = req.body;

    if (!method) {
      res.status(400).json({ error: "Please provide payment method" });
      return;
    }

    const response = await Order.findByIdAndUpdate(
      id,
      { paymentMethod: method.method },
      {
        new: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "payment method not updated" });
    }

    res.status(200).json("payment method has been updated");
  } catch (error) {
    console.error("Error during payment method update:", error);
  }
});

const updateDeliverStatus = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const deliverStatus = req.body;

    if (!deliverStatus) {
      res.status(400).json({ error: "Please provide deliver Status" });
      return;
    }

    const response = await Order.findByIdAndUpdate(
      id,
      deliverStatus,
      {
        new: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "deliver status not updated" });
    }

    res.status(200).json("deliver status has been updated");
  } catch (error) {
    console.error("Error during payment method update:", error);
  }
});

export {
  addOrder,
  displayOrder,
  displayAllOrders,
  updatePaymentMethod,
  updateDeliverStatus,
};
