import mongoose from "mongoose";

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
    contactNo: {
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
    currentDate: {
      type: Date,
    }
  },
  { timeStamp: true }
);

const Prescription = mongoose.model("Prescription", prescriptionShema);

export default Prescription;
