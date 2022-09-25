const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.Controller');
const api  = require('../api/Routes');
const config = require('../config/Config.Env');
const AuthRequest = require('../request/User.Request')

router.post(api.login, AuthRequest.validateLogin(), AuthController.login);
router.post(api.register, AuthRequest.validateRegister(),  AuthController.register);
router.post(api.logout, AuthController.logout);

module.exports = router;