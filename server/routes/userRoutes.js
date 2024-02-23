const express = require("express")
const router = express.Router()
const userController = require("../service/user")
const authenticate = require("../middleware/auth")

// Define user-related routes
router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/check-auth", authenticate.authenticate, userController.getUser)

module.exports = router
