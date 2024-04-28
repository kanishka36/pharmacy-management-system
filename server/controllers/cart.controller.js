import asyncHandler from "express-async-handler";
import Cart from "../models/cart.model.js";

//add cart
const addCart = asyncHandler(async (req, res) => {
  const { product, price, qty, subtotal } = req.body;
  const customerId = req.user.userId;

  try {
    if (!product || !price || !qty || !subtotal || !customerId) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields" });
    }

    await Cart.create({
      product,
      price,
      qty,
      subtotal,
      customerId,
    });

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error during customer registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display cart
const displayCart = asyncHandler(async (req, res) => {
  try {
    const id = req.user.userId;
    const cart = await Cart.find({ customerId: id });
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error during display cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { addCart, displayCart };
