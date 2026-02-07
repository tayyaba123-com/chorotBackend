const express = require("express");
const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlredyExits = await userModel.findOne({ email });

  if (isUserAlredyExits) {
    //null truthy

    return res.status(400).json({
      message: "Accout with this email already exits",
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
      email: user.email, //not generally
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token",token)

  res.status(201).json({
    message: "user registered successfuly",
    user,
    token,
  });
});

module.exports = authRouter;
