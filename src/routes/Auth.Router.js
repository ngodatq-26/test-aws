const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.Controller');
const api  = require('../api/Routes');
const config = require('../config/Config.Env');
const AuthRequest = require('../request/User.Request')

router.post(api.auth.login, AuthRequest.validateLogin(), AuthController.login);
router.post(api.auth.register, AuthRequest.validateRegister(),  AuthController.register);
router.post(api.auth.logout, AuthController.logout);
router.post(api.auth.refreshToken, AuthController.refreshTokenController);

module.exports = router;