const express = require('express')
const router = express.Router()

const registerController = require('../controllers/register')
const loginController = require('../controllers/login')

// Define user-related routes
router.post('/register', registerController.register)
router.post('/login', loginController.login)

module.exports = router
