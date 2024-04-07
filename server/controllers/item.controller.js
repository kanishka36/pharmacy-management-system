import asyncHandler from "express-async-handler";
import Item from "../models/item.model.js";

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

export { addItem, displayItem };