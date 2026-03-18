import {body,validationResult } from "express-validator"

const validate = (req,res,next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
        errors:errors.array()

         })
    }
    next()

      
}


export const registerValidation=[
body("username")
.trim()
.notEmpty().withMessage("Username is required")
.isString().withMessage("Username should be string")
.isLength({min:3,max:30}).withMessage("Username should be between 3 and 30"),

body("email")
.trim()
.notEmpty().withMessage("Email is required")
.isEmail().withMessage("Email should be valid email address"),
body("password")
.notEmpty().withMessage("Password is required")
.custom((value)=>{
 if(value.length<6){
    throw new Error("Password should be at least 6 characters long")

 }
 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
 if(!passwordRegex.test(value)){
    throw new Error("Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
 }
 return true

}),

validate
]