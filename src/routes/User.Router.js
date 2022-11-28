const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.Controller');
const api = require('../api/Routes');
const passport = require('passport');
const authMiddleware = require('../middlewares/Auth.Middleware');
const {validateUpdateUser, validateDeleteUser} = require('../request/User.Request');

router.use(authMiddleware.checkJwtMiddleware);
router.get(api.user.getAll, UserController.allUsers);
router.put(api.user.updateOne, validateUpdateUser(), UserController.updateOne);
router.delete(api.user.deleteOne, validateDeleteUser(), UserController.deleteOne);
router.get('/token', UserController.getUser)
module.exports = router;
