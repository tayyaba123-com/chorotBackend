import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';


async function sendTokenResponse(user, res, message, statusCode) {

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token)

    res.status(statusCode).json(
        {
            message,
            success: true,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                contact: user.contact,
                role: user.role
            }
        })


}


export const register = async (req, res) => {

    const { fullname, email, password, contact, isSeller } = req.body;

    try {

        const isUserAlreadyExists = await userModel.findOne({ $or: [{ contact }, { email }] });


        if (isUserAlreadyExists) {
            return res.status(400).json(
                {
                    message: "fullname or email already exists",
                    success: false,
                }
            );
        }

        const user = await userModel.create({
            fullname,
            email,
            password,
            contact,
            role: isSeller ? "seller" : "buyer"
        });


        await sendTokenResponse(user, res, "User registered successfully", 201);


    }
    catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: "Internal server error",
                success: false,
            }
        );
    }

}

export const login = async (req, res) => {

    const { email, password } = req.body


    try {

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            })
        }

        const isPasswordMatch = await user.comparePassword(password)


        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            })
        }

        await sendTokenResponse(user, res, "User Login successfully", 200)

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server error",
            success: false
        })
    }


}

export const googleCallBack = async (req, res) => {
    const {id,displayName,emails,photos} = req.user

  const  email = emails[0].value
  const photo = photos[0].value

  let user = await userModel.findOne({email})

  if(!user){
    user = userModel.create({
        email,
        fullname:displayName,
        googleId:id
    })
  }

  const token = jwt.sign({
    id:user._id,
  },config.JWT_SECRET,{expiresIn:'7d'})


  res.cookie("token",token)

    res.redirect("http://localhost:5173/")
}

