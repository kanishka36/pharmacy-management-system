import asyncHandler from "express-async-handler";
import Item from "../models/item.model.js";
import { error } from "console";

const addItem = asyncHandler(async (req, res) => {
  const {
    barcode,
    productName,
    category,
    expreDate,
    quantity,
    actualPrice,
    sellingPrice,
    image,
  } = req.body;

  try {
    if (
      !barcode ||
      !productName ||
      !category ||
      !expreDate ||
      !quantity ||
      !actualPrice ||
      !sellingPrice
    ) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }
    const existingItem = await Item.findOne({ barcode });

    if (existingItem) {
      res.status(400).json({ error: "This barcode already exists" });
      return;
    }

    const newItem = await Item.create({
      barcode,
      productName,
      category,
      expreDate,
      quantity,
      actualPrice,
      sellingPrice,
      image,
    });

    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error during item registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display item
const displayItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.find();
    res.status(201).send(item);
  } catch (error) {
    console.error("Error during item registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete item
const deleteItem = asyncHandler(async (req, res) => {
  try {
    if (req.user.role === "admin") {
      await Item.findByIdAndDelete(req.params.id);
      res.status(200).json("Item has been deleted");
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during item delete:", error);
  }
});

//update item
const updateItem = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const {
      barcode,
      productName,
      category,
      expreDate,
      quantity,
      actualPrice,
      sellingPrice,
      image,
    } = req.body;

    if (
      !barcode ||
      !productName ||
      !category ||
      !expreDate ||
      !quantity ||
      !actualPrice ||
      !sellingPrice
    ) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }
    if (req.user.role === "admin") {
      const response = await Item.findByIdAndUpdate(
        id,
        {
          barcode,
          productName,
          category,
          expreDate,
          quantity,
          actualPrice,
          sellingPrice,
          image,
        },
        { new: true }
      );
      if (!response) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json("Item has been updated");
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during item update:", error);
  }
});

//search item
const searchItem = asyncHandler(async (req, res) => {
  try {
    const searchInput = req.query.search;
    const regex = new RegExp(searchInput, "i");
    const searchData = await Item.find({ productName: regex });
    res.status(200).json(searchData);
  } catch (error) {
    console.error("Error during item search:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { addItem, displayItem, deleteItem, updateItem, searchItem };
