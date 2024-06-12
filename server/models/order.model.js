import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    cartItems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "provide cart id"],
    },
    status: {
      type: String,
      required: true
    },
    customerId: {
      type: String,
      required: [true, "provide customer id"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
