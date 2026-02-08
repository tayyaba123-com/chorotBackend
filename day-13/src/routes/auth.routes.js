const express = require("express");
const userModel = require("../model/users.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

// api/auth/register

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyPresent = await userModel.findOne({ email });

  if (isUserAlreadyPresent) {
    //{} object value truthy
    return res.status(409).json({
      message: "With this email user already exists",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
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

// api/auth/login
//controler

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "With this email their is no User",
    });
  }

  const ispasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!ispasswordMatched) {
    return res.status(401).json({
      message: "Wrong Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },process.env.JWT_SECRET,
  );
  
  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User Logged In",
  });
});

//api/auth/logout
authRouter.post("/logout", async (req, res) => {
  
  
    const token = req.cookies.jwt_token;
    console.log(token)

  if (!token) {
    return res.status(200).json({
    message: "Already Logged OUT ",
  });

  }

 
 res.clearCookie("jwt_token")

    return res.status(200).json({
      message: "User LoggedOUT",
    });
});

module.exports = authRouter;
