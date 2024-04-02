import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

const regUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, role, phone, email, password } = req.body;

  try {
    if (!firstName || !lastName || !phone || !email || !role) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      role,
      phone,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { regUser };
