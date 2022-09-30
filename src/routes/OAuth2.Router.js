const express = require('express');
const passport = require('passport');
const router = express.Router();
const api = require('../api/Routes');
const OAuth2Controller = require('../controllers/OAuth2.Controller');

router.get(api.oauth.loginGoole, passport.authenticate('google', {scope : ['email', 'profile']}));
router.get(api.oauth.callbackGoogle, passport.authenticate('google'));

module.exports = router;  