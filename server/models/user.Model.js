// import mongoose from "mongoose";

// const userSchema = mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: [true, "Please add a first name"],
//     },
//     lastName: {
//       type: String,
//       required: [true, "Please add a last name"],
//     },
//     role: {
//       type: String,
//       required: [true, "Please select role"],
//     },
//     email: {
//       type: String,
//       required: [true, "Please add a email"],
//       unique: true,
//     },
//     phone: {
//       type: Number,
//       required: [true, "Please add phone number"],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Please add a password"],
//       default: "defaultPassword",
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// export default User;
