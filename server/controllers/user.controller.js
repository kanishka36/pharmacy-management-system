import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

const regUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    phone,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).send("User registered successfuully");
  }
});

export { regUser };
