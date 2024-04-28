import asyncHandler from "express-async-handler";
import Prescription from "../models/prescription.model.js";

//upload prescription
const addPrescription = asyncHandler(async (req, res) => {
  const { name, email, age, contactNo, deliveryAddress, note, image } =
    req.body;

  try {
    if (!name || !email || !age || !contactNo || !deliveryAddress || !image) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }

    await Prescription.create({
      name,
      email,
      age,
      contactNo,
      deliveryAddress,
      note,
      image,
    });

    res.status(200).json({ message: "Prescription uploaded successfully" });
  } catch (error) {
    console.error("Error during prescription upload:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { addPrescription };
