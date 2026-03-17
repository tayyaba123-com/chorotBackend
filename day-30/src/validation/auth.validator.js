import { body,validationResult } from "express-validator"

const validate = (req,res,next)=>{
  const errors=validationResult(req)
     if(errors.isEmpty()){
        return next()
     }

     res.status(400).json({
        "errors":errors.array()
     })
}
 
 export  const registrationValidation=[
    body("username").isString().withMessage("username sholudbe a string"),
    body("email").isEmail().withMessage("Email is not a valid email address"),
    body("password").custom((value)=>{
      if(value.length <8){
         throw new error("Password should have at least eight character long")
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
      if(!passwordRegex.test(value)){
         throw new error ("Password at least contains  1 uppercase, 1 lowercase, 1 number, 1 special character")
      }
      return true
    }).withMessage("Password should have at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character"),
    
    validate
   ]



