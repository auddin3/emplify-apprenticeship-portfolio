const express = require('express');
const router = express.Router();
const userController = require('../service/user');

// Define user-related routes
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
