const { body, checkBody, check, param, } = require('express-validator');
const expressValidator = require("express-validator");
const { Book } = require('../models/Book.Schema');
const { User } = require('../models/User.Schema');

const arrayValidate = [
    body('title', 'The title is not Empty').not().notEmpty(),
    body('author', 'The author is not Empty').not().notEmpty(),
    body('author').custom(author => {
        return User.findUserByObjectId(author).then(data => {
            if (!data) {
                return Promise.reject('Author is not exist');
            }
        })
    }),
    body('listbook', 'List book array min >= 1').not().notEmpty(),
    body('listbook.*.name', 'The name is not empty').not().notEmpty(),
    body('listbook.*.name', 'The name must be string').isString().isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('listbook.*.description', 'The name is not empty').not().notEmpty(),
    body('listbook.*.description', 'The name must be string').isString().isLength({ min: 5 }).withMessage('must be at least 5 chars long')
     
];

const arrayValidateGet = [
    body('offset').isNumeric().withMessage('Offset must be numeric'),
    body('limit').isNumeric().withMessage('Limit must be numeric'),
    body('author').isString().withMessage('Author must be string'),
]

const arrayValidateParam = [
    param('id').custom(id => {
        return Book.getOneBook(id).then(data => {
            if (!data) {
                return Promise.reject('Book is not exist');
            }
        })
    })
];

const arrayValidateUpdate = arrayValidate.concat(arrayValidateParam);

const arrayValidateDelete = [
    body('listId', 'List delete ObjectId array min >= 1').not().notEmpty(),
    body('listId.*').custom(id => {
        return Book.getOneBook(id).then(data => {
            if (!data) {
                return Promise.reject('Book is not exist');
            }
        })
    })
];
const validateGetBook = () => {
    return arrayValidateGet;
}

const validateCreateBook = () => {
    return arrayValidate;
};

const validateUpdateBook = () => {
    return [...arrayValidateParam, ...arrayValidate];
}

const validateDeleteBook = () => {
    return arrayValidateDelete;
}


module.exports = {
    validateCreateBook : validateCreateBook,
    validateUpdateBook : validateUpdateBook,
    validateDeleteBook : validateDeleteBook,
    validateGetBook : validateGetBook
}