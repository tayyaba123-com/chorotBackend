import {Router} from 'express';
import {registerValidation,loginValidation} from '../validators/auth.validator.js';
import {register,login} from '../contollers/auth.controller.js';

const authRouter = Router();



/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 * 
 */
authRouter.post("/register", register);


/**
 * @route POST /auth/login
 * @desc Login a user
 * @access Public
 */

authRouter.post("/login",loginValidation,login)

export default authRouter;