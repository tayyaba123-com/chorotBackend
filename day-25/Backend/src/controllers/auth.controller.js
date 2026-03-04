const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, password, email } = req.body;

  const isUserAlreadyRegister = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyRegister) {
    return res.status(409).json({
      message:
        "User already present with" +
        (isUserAlreadyRegister.username === username ? "username" : "email"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    password: hash,
    email,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message:"User register successfuly",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }

  })

}

async function loginUser(req,res) {
    
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},{email}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign(
      {
      id:user._id,
      username:user.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn:"1d"
    }
)


res.cookie("token",token)

res.status(200).json({
    message:"User login successfuly",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})
}


module.exports = {
    registerUser,loginUser
}
