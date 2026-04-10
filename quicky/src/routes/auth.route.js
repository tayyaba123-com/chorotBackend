import {Router} from 'express';
import {registerValidation} from '../validators/auth.validator.js';
import {register} from '../contollers/auth.controller.js';

const authRouter = Router();



/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 * 
 */
authRouter.post("/register", register);

export default authRouter;