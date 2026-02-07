const express = require("express");
const userModel = require("../model/users.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const authRouter = express.Router();

// api/auth/register
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyPresent = await userModel.findOne({ email });

  if (isUserAlreadyPresent) {
    return res.status(409).json({
      message: "User with this email is already present",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")
  const user = await userModel.create({
    name,
    email,
    password:hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User registered",
    user,
    token,
  });
});

// // api/auth/protected
// authRouter.post("/protected", (req, res) => {
//   console.log(req.cookies);

//   res.status(200).json({
//     message: "protected route",
//   });
// });

// controler
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "user do not found with this email address",
    });
  }

  const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid Passwaord",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User Loged In",
    user,
  });
});

module.exports = authRouter;
