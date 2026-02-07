const express = require("express");
const userModel = require("../model/users.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  
  const isUserAlreadyPresent = await userModel.findOne({ email });

   if (isUserAlreadyPresent) {
    return res.status(409).json({
      message: "User with this email is already present",
    });
  }


  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token",token)

  res.status(201).json({
    message:"User registered",
    user,
    token
  })
});

module.exports = authRouter