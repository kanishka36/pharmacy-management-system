import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const prescriptionShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "please add a email"],
    },
    age: {
      type: Number,
      required: [true, "please add age"],
    },
    constactNo: {
      type: Number,
      required: [true, "please add a contact number"],
    },
    deliveryAddress: {
      type: String,
      required: [true, "please add a address"],
    },
    note: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "please add a prescription"],
    },
  },
  { timeStamp: true }
);

const Prescription = mongoose.model("Prescription", prescriptionShema);

export default Prescription;
