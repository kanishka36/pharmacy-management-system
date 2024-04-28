import asyncHandler from "express-async-handler";
import { Item, Category } from "../models/item.model.js";

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

    await Item.create({
      barcode,
      productName,
      category,
      expreDate,
      quantity,
      actualPrice,
      sellingPrice,
      image,
    });

    res.status(200).json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error during item registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display item
const displayItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.find();
    res.status(200).send(item);
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

//add category
const addCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  try {
    if (!category) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }
    const existingItem = await Category.findOne({ category });

    if (existingItem) {
      res.status(400).json({ error: "This category already exists" });
      return;
    }

    await Category.create({ category });

    res.status(201).json({ message: "category added successfully" });
  } catch (error) {
    console.error("Error during category add:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display category
const displayCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find();
    res.status(201).send(category);
  } catch (error) {
    console.error("Error during category display:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { category } = req.body;

    if (!category) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }
    if (req.user.role === "admin") {
      const response = await Category.findByIdAndUpdate(
        id,
        { category },
        { new: true }
      );
      if (!response) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json("Category has been updated");
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during Category update:", error);
  }
});

//delete category
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    if (req.user.role === "admin") {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Category has been deleted");
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during category delete:", error);
  }
});

//search product in dashboard
const searchItemDashboard = asyncHandler(async (req, res) => {
  const { barcode, productName, category } = req.body;
  const filters = {};

  if (barcode) {
    filters.barcode = barcode;
  }

  if (productName) {
    filters.productName = { $regex: new RegExp(productName, "i") };
  }

  if (category) {
    filters.category = category;
  }

  try {
    if (req.user.role === "admin") {
      const searchItem = await Item.find(filters);
      res.status(200).json(searchItem);
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during item search:", error);
  }
});

export {
  addItem,
  displayItem,
  deleteItem,
  updateItem,
  searchItem,
  addCategory,
  displayCategory,
  updateCategory,
  deleteCategory,
  searchItemDashboard,
};
