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

    let currentDate = new Date().toJSON().slice(0, 10);

    await Prescription.create({
      name,
      email,
      age,
      contactNo,
      deliveryAddress,
      note,
      image,
      currentDate,
    });

    res.status(200).json({ message: "Prescription uploaded successfully" });
  } catch (error) {
    console.error("Error during prescription display:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const displayPrescription = asyncHandler(async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const prescription = await Prescription.find();
      res.status(200).send(prescription);
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during item delete:", error);
  }
});

const displaySinglePres = asyncHandler(async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const prescription = await Prescription.findById(req.params.id);
      if (prescription) {
        res.status(200).send(prescription);
      } else {
        res.status(404).json({ message: "Prescription not found" });
      }
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during display single prescription:", error);
  }
});

export { addPrescription, displayPrescription, displaySinglePres };
