const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nmae:String,
    email:{
        type:String,
        unique:[true,"With this email user already exists"]
    },
    password:String
})

const userModel = mongoose.model("Users",userSchema)

module.exports = userModel