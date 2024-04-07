import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    barcode: {
      type: String,
      required: [true, "Please add a barcode"],
      unique: true,
    },
    productName: {
      type: String,
      required: [true, "Please add a product name"],
    },
    category: {
      type: String,
      required: [true, "Please select a product category"],
    },
    expreDate: {
      type: Date,
      required: [true, "Please add a expre date"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
    },
    actualPrice: {
      type: Number,
      required: [true, "Please add actual price"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "Please add selling price"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
