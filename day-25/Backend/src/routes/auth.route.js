const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = Router()


/**
 * POST api/auth/register
 */

router.post("/register",authController.registerUser)

/**
 * POST api/auth/login
 * */

router.post("/login",authController.loginUser)

/**
 * GET api/auth/get-me  gives user,that requested on this api
 */

router.get("/get-me",authMiddleware,authController.getMe)

/**
 * GET api/auth/logout 
 */

router.get("/logout",authController.logoutUser)

module.exports = router