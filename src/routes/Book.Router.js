const express = require('express');
const router = express.Router();
const BookController = require('../controllers/Book.Controller');
const api = require('../api/Routes');
const authMiddleware = require('../middlewares/Auth.Middleware');
const bookRequest = require('../request/Book.Request');

router.use(authMiddleware.checkJwtMiddleware);
router.get(api.book.getAll, BookController.getAll);
router.get(api.book.getOne, BookController.getOne);
router.post(api.book.createOne, bookRequest.validateCreate(), BookController.createOne);
router.put(api.book.updateOne, bookRequest.validateUpdate(), BookController.updateOne);
router.delete(api.book.deleteOne, bookRequest.validataDelete(), BookController.deleteOne);

module.exports = router;