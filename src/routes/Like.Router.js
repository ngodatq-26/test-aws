const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/Like.Controller');
const api = require('../api/Routes');
const authMiddleware = require('../middlewares/Auth.Middleware');
const likeRequest = require('../request/Like.Request');

router.use(authMiddleware.checkJwtMiddleware);
router.get(api.like.getAll, LikeController.getAll);
router.get(api.like.getOne, LikeController.getOne);
router.post(api.like.like, likeRequest.validateCreate(), LikeController.like);
router.post(api.like.unlike, likeRequest.validateCreate(), LikeController.unlike);
router.put(api.like.updateOne, likeRequest.validateUpdate(), LikeController.updateOne);
router.delete(api.like.deleteOne, likeRequest.validataDelete(), LikeController.deleteOne);

module.exports = router;