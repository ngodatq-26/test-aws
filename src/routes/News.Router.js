const express = require('express');
const router = express.Router();
const api = require('../api/Routes');
const NewsController = require('../controllers/News.Controller');
const NewsRequest = require('../request/News.Request');
const authMiddleware = require('../middlewares/Auth.Middleware');

router.get(api.news.getAll, NewsController.getAll);
router.get(api.news.getOne, NewsController.getOne);
router.post(api.news.createOne, authMiddleware.checkJwtMiddleware, NewsRequest.validateCreate(), NewsController.createOne);
router.put(api.news.updateOne, authMiddleware.checkJwtMiddleware, NewsRequest.validateUpdate(), NewsController.updateOne);
router.delete(api.news.deleteOne, authMiddleware.checkJwtMiddleware, NewsRequest.validataDelete(), NewsController.deleteOne);


module.exports = router;