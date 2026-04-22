import {Router} from 'express';
import {registerValidation,loginValidation} from '../validators/auth.validator.js';
import {register,login , googleCallBack} from '../contollers/auth.controller.js';
import passport from 'passport'
const authRouter = Router();
import { config } from '../config/config.js';



/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 * 
 */
authRouter.post("/register",registerValidation, register);


/**
 * @route POST /auth/login
 * @desc Login a user
 * @access Public
 */

authRouter.post("/login",loginValidation,login)


authRouter.get("/google",
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get("/google/callback",
  passport.authenticate('google', { session: false,failureRedirect:config.NODE_ENV == "development"? "http://localhost:5173/login":"/login" }),
 googleCallBack
);


export default authRouter;