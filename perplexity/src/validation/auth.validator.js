import {body,validationResult } from "express-validator"

const validate = (req,res,next)=>{
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    res.status(400).json({
        errors:errors.array()
    })
}


export const registerValidation=[
body("username").isString().withMessage("Username should be string"),
body("email").isEmail().withMessage("Email should be valid email address"),
body("password").custom((value)=>{
 if(value.length<6){
    throw new Error("Password should be at least 6 characters long")

 }const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/
 if(passwordRegex.test(value)){
    throw new Error("Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
 }
 else true

}).withMessage("Password shold contains at least one uppercase letter, one lowercase letter, one number, and one special character and be at least 6 character long."),

validate
]