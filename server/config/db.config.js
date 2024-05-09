import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URL)
    await mongoose.connect("mongodb+srv://kanishka:kanishka@smart-pharmacy.fgozvlk.mongodb.net/smart-pharmacy?retryWrites=true&w=majority&appName=smart-pharmacy")
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
