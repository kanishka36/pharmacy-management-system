import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: [true, "provide item id"],
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
