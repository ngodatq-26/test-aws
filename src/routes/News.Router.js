const express = require('express');
const router = express.Router();
const api = require('../api/Routes');
const NewsController = require('../controllers/News.Controller');
const NewsRequest = require('../request/News.Request');
const authMiddleware = require('../middlewares/Auth.Middleware');

// router.use(authMiddleware.checkJwtMiddleware);
router.get(api.news.getAll, NewsController.getAll);
router.get(api.news.getOne, NewsController.getOne);
router.post(api.news.createOne, NewsRequest.validateCreate(), NewsController.createOne);
router.put(api.news.updateOne, NewsRequest.validateUpdate(), NewsController.updateOne);
router.delete(api.news.deleteOne, NewsRequest.validataDelete(), NewsController.deleteOne);

module.exports = router;