import asyncHandler from "express-async-handler";
import Cart from "../models/cart.model.js";

//add cart
const addCart = asyncHandler(async (req, res) => {
  const { productName, sellingPrice, quantity } = req.body;
  const customerId = req.user.userId;

  try {
    if (!productName || !sellingPrice || !customerId) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields" });
    }

    await Cart.create({
      productName,
      sellingPrice,
      quantity,
      customerId,
    });

    res.status(200).json({ message: "Product Added to your Cart Successfully" });
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

//delete cart
const deleteCart = asyncHandler(async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Item has been deleted");
  } catch (error) {
    console.error("Error during item delete:", error);
  }
});

//update cart
const updateCart = asyncHandler(async (req, res) => {
  const updateItems = req.body;
  const customerId = req.user.userId;
  try {
    if (!customerId) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields" });
    }
    // Loop through the updated items array and update each item in the database
    const updateCart = await Promise.all(
      updateItems.map(async (item) => {
        const { itemId, quantity } = item;

        const updatedItem = await Cart.findByIdAndUpdate(
          itemId,
          { quantity },
          { new: true }
        );
        return updatedItem;
      })
    );
    res.status(200).json("Cart has been updated");
  } catch (error) {
    console.error("Error during cart update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { addCart, displayCart, deleteCart, updateCart };
