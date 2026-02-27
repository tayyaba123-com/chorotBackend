const userModel = require("../models/users.model")
const bycrypt = require("")



async function registerController(){
const {username,email,password} = req.body

const isUserAlreadyPresent = await userModel.findOne({
    $or:[
        {
            username
        },{
            email
        }
    ]
})
if(isUserAlreadyPresent){
    return res.status(409).json({
        message:"user already exists",
        
    })
    }

    const user  = await userModel.create({
        username,password,email,bio,profileImage
    })

   res.status(201).json({
    message:"user created successfuly",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage
    }
   })



}