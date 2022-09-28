const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.Controller');
const api = require('../api/Routes');
const passport = require('passport');
const authMiddleware = require('../middlewares/Auth.Middleware');

router.use(authMiddleware.checkJwtMiddleware);
router.get(api.user.all, UserController.allUsers);

module.exports = router;
