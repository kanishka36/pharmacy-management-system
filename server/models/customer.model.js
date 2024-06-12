import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    role: {
      type: String,
      default: "customer",
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    phone: {
      type: Number,
      required: [true, "Please add a phone number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
