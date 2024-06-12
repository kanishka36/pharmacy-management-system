import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import Customer from "../models/customer.model.js";

//login customer
const regCustomer = asyncHandler(async (req, res) => {
  const { firstName, lastName, role, phone, email, address, password } =
    req.body;

  try {
    if (!firstName || !lastName || !phone || !email || !address || !password) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      res.status(400).json({ error: "This email already exists" });
      return;
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newCustomer = await Customer.create({
      firstName,
      lastName,
      role,
      phone,
      email,
      address,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error("Error during customer registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const editCustomer = asyncHandler(async (req, res) => {
  try {
    const id = req.user.userId;
    const customer = await Customer.findById(id);
    res.status(201).send(customer);
  } catch (error) {
    console.error("Error during customer update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { regCustomer, editCustomer };
