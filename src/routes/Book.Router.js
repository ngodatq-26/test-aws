const express = require('express');
const router = express.Router();
const api = require('../api/Routes');
const BookController = require('../controllers/Book.Controller');
const AuthMiddleware = require('../middlewares/Auth.Middleware');
const BookRequest = require('../request/Book.Request');

router.use(AuthMiddleware.checkJwtMiddleware);

router.get(api.book.getAll, BookRequest.validateGetBook(), BookController.getAll);
router.get(api.book.getOne, BookController.getAll);
router.post(api.book.createOne, BookRequest.validateCreateBook(), BookController.createOne);
router.put(api.book.updateOne, BookRequest.validateUpdateBook(), BookController.updateOne);
router.delete(api.book.delete, BookRequest.validateDeleteBook(), BookController.delete);

module.exports = router;