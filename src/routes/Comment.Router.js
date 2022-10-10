const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/Comment.Controller');
const api = require('../api/Routes');
const authMiddleware = require('../middlewares/Auth.Middleware');
const commentRequest = require('../request/Comment.Request');

// router.use(authMiddleware.checkJwtMiddleware);
router.get(api.comment.getAll, CommentController.getAll);
router.get(api.comment.getOne, CommentController.getOne);
router.post(api.comment.createOne, commentRequest.validateCreate(), CommentController.createOne);
router.put(api.comment.updateOne, commentRequest.validateUpdate(), CommentController.updateOne);
router.delete(api.comment.deleteOne, commentRequest.validataDelete(), CommentController.deleteOne);

module.exports = router;