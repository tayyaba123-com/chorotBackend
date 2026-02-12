const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "With this username , User already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "With this email, User already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/2mxs0dvzc/8a14fefc276ab576e8ceac207cace638.jpgf",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
