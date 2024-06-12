import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    cartItems: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Cart",
      required: [true, "provide cart id"],
    },
    status: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: [true, "provide customer id"],
    },
    deliverStatus: {
      type: String,
      default: "Processing",
    },
    deliveryAddress: {
      type: String,
      required: [true, "provide deliver address"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Provide payment Method"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
