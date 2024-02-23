const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")
const authz = require("../middleware/auth")

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/authenticate", authz.authenticate)

module.exports = router
