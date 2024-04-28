import express from "express";
import { addPrescription } from "../controllers/prescription.controller";

const prescriptionRouter = express.Router();

prescriptionRouter.post("/upload-prescription", addPrescription);

export { prescriptionRouter };
