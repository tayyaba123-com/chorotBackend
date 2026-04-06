import "dotenv/config";

import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.services.js";
import jwt from "jsonwebtoken";


export async function register(req, res) {

  try{
 const { username, email, password } = req.body;

  const isUserAlredyPresent = await userModel.findOne({
    $or: [{ username }, { password }],
  });

  if (isUserAlredyPresent) {
    return res.status(400).json({
      message: "User already exists with this username and email",
      success: false,
      err: "User already exists",
    });
  }

  const user = await userModel.create({ username, email, password });

  const emailVerificationToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
  );


  try{
  
     await sendEmail(
    email,
    "You have landed on Perplexity",
    `Hi beloved ${username}`,
    `<p>We are honour to have you as our user form <strong>Perplexity</strong></p><br/>
    <p> We are excited to have you on board and look forward to providing you with the best experience possible.</p><br/>
    <p>Please click on the link below to verify your email:</p><br/><p>
            <a href="http://localhost:5000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a></p><br/>
            <p>If you did not sign up for an account, please ignore this email.</p><br/>
            <p>Best regards,</p><br/><p>The Perplexity Team</p>`,
  );

  }
  catch(emailErr){
    return res.status(500).json({
      message:"Failed to send verification email",
       success:false,
      err:emailErr.message,
  })

  }

    

 

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });

  }catch(error){
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      err: error.message
  })


  }
 
}

export async function verifyEmail(req, res) {
  const { token } = req.query;
 
  if(!token){
    return res.status(400).json({
      message:"Token is required",
      success:false,
      err:"Token is required"
    })
  }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({email:decoded.email})
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false,
                err:"User not found"
            })
        }

        if(user.verified){
          const html = 
          `
          <h1>Email is  Already Verified</h1>
          <p>Your Email is already verified ${user.username}</p>`

          return res.send(html)

          //return res.redirect(`${process.env.FRONTEND_URL}/login?msg=already-verified`);
        }

        
        user.verified = true;
        await user.save();


           const html = 
        `
        <h1>Email Verified Successfully</h1>
        <p>Hi ${user.username},</p>
        <p>Your email has been verified successfully. You can now log in to your account and start using our services.</p>
        <a href="http://localhost:5000/login">Login to your account</a>
        `

        res.send(html)

       
       

    } catch (error) {
        return res.status(400).json({
            message:"Invalid token",
            success:false,
            err:"Invalid token"
        })
    }
}

export async function getMe(req,res){

    const user = await userModel.findById(req.user.id).select("-password")

    if(!user){
        return res.status(404).json({
            message:"User not found",
            success:false,
            err:"User not found"
        })
    }

    res.status(200).json({
        message:"User fetched successfully",
        success:true,
        user
    })

}

export async function login(req,res){

    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials",
            success:false,
            err:"user not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid Credentials",
            success:false,
            err:"Invalid password"
        })
    }

    if(!user.verfied){
        return res.status(400).json({
            message:"Please verify your email before logging in",
            success:false,
            err:"Email not verified"
        })
    }


    const token = jwt.sign(
        {id:user._id,
        username:user.username,
        },
        process.env.JWT_SECRET,
        {expiresIn:"5d"}

    )
    

    res.cookie("token",token)


    res.status(200).json({
      message:"Login Successfuly",
      success:true,
      user:{
        id:user._id,
        username:user.username,
        email:user.email
      }
    })

}

export async function resendEmail(req,res){

  try{

    const {email} = req.body

  const user = await userModel.findOne({email})
  
  
  if(!user){
    return res.status(404).json({
      message:"User not found",
      success:false,
      err:"User not found"
    })
  }
  
  const isUserVerified = user.verified

 

  if(isUserVerified){
    return res.status(400).json({
      message:"Email is already verified",
      success:false,
      err:"Email is already verified"
    })
  }

  const emailVerificationToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
  );



  
  try{
await sendEmail(
   email,
      "Verify your Perplexity account",
      `Hi ${user.username}`,
      `<p>We are honored to have you as a user <strong>from Perplexity</strong></p>
       <p>Please click the link below to verify your email:</p>
       <a href="http://localhost:5000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
       <p>If you did not sign up for an account, please ignore this email.</p>
       <p>This link will expire in 1 hour.</p>
       <p>Best regards,</p><p>The Perplexity Team</p>`
  );

  }
  catch(emailErr){
    return res.status(500).json({
      message:"Failed to send verification email",
      success:false,
      err:emailErr.message
    })
  }
  
 res.status(200).json({
  message:"Verification email sent successfully",
  success:true
 })

  }catch(error){

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      err: error.message
  })

  }

  
  
}