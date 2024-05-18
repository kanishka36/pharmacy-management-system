import express from "express";
import {
  addPrescription,
  displayPrescription,
  displaySinglePres,
} from "../controllers/prescription.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const prescriptionRouter = express.Router();

prescriptionRouter.post("/upload-prescription", addPrescription);
prescriptionRouter.get(
  "/display-prescription",
  verifyToken,
  displayPrescription
);
prescriptionRouter.get(
  "/display-prescription/:id",
  verifyToken,
  displaySinglePres
);

export { prescriptionRouter };
