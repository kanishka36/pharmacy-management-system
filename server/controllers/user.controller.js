import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
// import User from "../models/user.model.js";
const User = require("../models/user.model.js")
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

    generateToken(res, validUser._id, validUser.role);
    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json({ rest });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display user
const displayUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).send(user);
  } catch (error) {
    console.error("Error during item registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//udate user
const updateUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, role, phone, email } = req.body;

    if (!firstName || !lastName || !role || !phone || !email) {
      res.status(400).json({ error: "Please fill in all required fields" });
      return;
    }
    if (req.user.role === "admin") {
      const response = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          role,
          phone,
          email,
        },
        { new: true }
      );

      if (!response) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.status(200).json("Member has been updated");
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during member update:", error);
  }
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.role === "admin") {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during user delete:", error);
  }
});

//search user
const searchUser = asyncHandler(async (req, res) => {
  const { name, role } = req.body;
  const filters = {};

  if (name) {
    const [firstName, lastName] = name.split(" ");

    // If both first name and last name are provided, search for both
    if (firstName && lastName) {
      filters.$and = [
        { firstName: { $regex: new RegExp(firstName, "i") } },
        { lastName: { $regex: new RegExp(lastName, "i") } },
      ];
    } else {
      // If only one of them is provided, search for either first name or last name
      filters.$or = [
        { firstName: { $regex: new RegExp(firstName || lastName, "i") } },
        { lastName: { $regex: new RegExp(firstName || lastName, "i") } },
      ];
    }
  }
  if (role) {
    filters.role = role;
  }

  try {
    if (req.user.role === "admin") {
      const searchUser = await User.find(filters);
      res.status(200).json(searchUser);
    } else {
      return res.status(401).json("You are not authorized");
    }
  } catch (error) {
    console.error("Error during user search:", error);
  }
});

//logout user
const logout = asyncHandler(async (req, res) => {
  try {
    res
      .clearCookie("access_token", { httpOnly: true })
      .status(200)
      .json({ message: "User has been logged out" });
  } catch (error) {
    console.error("Error clearing cookie:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { regUser, loginUser, displayUser, updateUser, deleteUser, searchUser, logout };
