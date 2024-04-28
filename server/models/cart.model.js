import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    product: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "provide price"],
    },
    qty: {
      type: Number,
      required: [true, "provide quantity"],
    },
    subtotal: {
      type: Number,
      required: [true, "provide subtotal"],
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
