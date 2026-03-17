import { Router } from "express";
import regitserUser from "../controllers/auth.controller.js";
import { registrationValidation } from "../validation/auth.validator.js";
const authRouter = Router()


authRouter.post("/register",registrationValidation,regitserUser)

// authRouter.post("/register",regitserUser)

// authRouter.use(errorHandler)

export default authRouter 