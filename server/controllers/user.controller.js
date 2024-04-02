import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
import generateToken from "../utils/generateToken.util.js";

//register staff
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

//login staff
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser =
      (await User.findOne({ email })) || (await Customer.findOne({ email })); //both customer and user login
    if (!validUser) {
      res.status(404).json({ error: "User not found!" });
      return;
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      res.status(401).json({ error: "Wrong cridential....!" });
      return;
    }

    generateToken(res, validUser._id);
    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json({ rest });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { regUser, loginUser };
