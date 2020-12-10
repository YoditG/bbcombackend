var express = require('express');
var authRouter = express.Router();
const authController = require('../controllers/authUserController')
const userController = require('../controllers/userController')

authRouter.post('/login',authController.login)

authRouter.post('/register', userController.register)

module.exports = authRouter;