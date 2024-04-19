import jwt from "jsonwebtoken";

const generateToken = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("access_token", token, {
    httpOnly: true,
  });
};

export default generateToken;
