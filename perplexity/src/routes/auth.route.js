import { Router } from "express";
import { registerValidator,loginValidator } from "../validators/auth.validator.js";
import { register,verifyEmail,login,getMe } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 * @returns { message, success, user }
 */
authRouter.post("/register",registerValidator,register)


/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 * @body { email, password }
 * @returns { message, success, token }
 */
authRouter.post("/login",loginValidator,login)

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user
 * @access Private
 * @returns { message, success, user }
 */

authRouter.get("/get-me",authUser,getMe)



/**
 * @route GET /api/auth/verify-email
 * @desc Verify email address
 * @access Public
 * @query { token }
 * @returns { message, success }
 */

authRouter.get("/verify-email", verifyEmail);



export default authRouter;