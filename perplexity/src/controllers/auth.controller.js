import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.services.js";


export async function registerUser(req,res){

    const {username,email,password} = req.body;

const isUserAlreadyPresent = await userModel.findOne({
    $or:[
        {username},{email}
    ]
})

if(isUserAlreadyPresent){
    return res.status(400).json({
        message:"User is already present with this username or email ",
        success:false,
        err:"User already present"      
    })
    
}

const user = await userModel.create({username,email,password})

await sendEmail(
    email,
  'Test Email Subject',
  'This is a test email sent with Nodemailer using OAuth2.',
  '<p>This is a test email sent with <b>Nodemailer</b> using OAuth2.</p>'

)

res.status(201).json({
    message:"User registered successfully",
    success:true,
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})

}


