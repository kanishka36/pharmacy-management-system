import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import Customer from "../models/customer.model.js";
import jwt from "jsonwebtoken";

//login customer
const regCustomer = asyncHandler(async (req, res) => {
  const { firstName, lastName, role, phone, email, password } = req.body;

  try {
    if (!firstName || !lastName || !phone || !email || !password) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      res.status(400).json({ error: "Customer already exists" });
      return;
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newCustomer = await Customer.create({
      firstName,
      lastName,
      role,
      phone,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error("Error during customer registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//login customer
const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const validCustomer = await Customer.findOne({ email });
    if (!validCustomer) {
      res.status(404).json({ error: "Customer not found!" });
      return;
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validCustomer.password
    );
    if (!validPassword) {
      res.status(401).json({ error: "Wrong cridential!" });
      return;
    }
    const token = jwt.sign({ id: validCustomer._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validCustomer._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ rest });
  } catch (error) {
    console.error("Error during customer login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { regCustomer, loginCustomer };
