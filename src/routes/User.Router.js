const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.Controller');
const api = require('../api/Routes');
const passport = require('passport');

router.get(api.user.all, passport.authenticate('jwt', {session : false}),UserController.allUsers);

module.exports = router;
