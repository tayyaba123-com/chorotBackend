import {body, validationResult} from 'express-validator';

const validate = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
        .json({errors: errors.array()});
    }
    next();
}

export  const registerValidation = [
    body('fullname')
    .notEmpty().withMessage('Full name is required')
    .isLength({min:3,max:30}).withMessage('Full name must be between 3 and 30 characters long'),

    body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

    body('password')    
    .notEmpty().withMessage('Password is required')
    .isLength({min:6}).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).withMessage('Password must contain at least one letter and one number'),

    body('contact')
    .notEmpty().withMessage('Contact is required')
    .isMobilePhone('any').withMessage('Invalid contact number format')
    .matches(/^\d{10}$/).withMessage('Contact number must be 10 digits long'),

    body('isSeller')
    .isBoolean().withMessage("isSeller must be a boolean value"),

    validate
]

export const loginValidation = [
    body("email")
    .isEmail().withMessage("Invalid Email formate")
    .notEmpty().withMessage("Email is required"),

    body("password")
     .notEmpty().withMessage('Password is required')
    .isLength({min:6}).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).withMessage('Password must contain at least one letter and one number'),

    validate
]


