import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    productName: {
      type: String,
    },
    sellingPrice: {
      type: Number,
      required: [true, "provide price"],
    },
    quantity: {
      type: Number,
      default: 1,
      required: [true, "provide quantity"],
    },
    subtotal: {
      type: Number,
    },
    customerId: {
      type: String,
      required: [true, "provide customer id"],
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
