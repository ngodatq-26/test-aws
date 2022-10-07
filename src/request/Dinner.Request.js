const { body, checkBody, check, param, } = require('express-validator');
const expressValidator = require("express-validator");
const { Dinner } = require('../models/Dinner.Schema');
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
    body('listdinner', 'List dinner array min >= 1').not().notEmpty(),
    body('listdinner.*.name', 'The name is not empty').not().notEmpty(),
    body('listdinner.*.name', 'The name must be string').isString().isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('listdinner.*.description', 'The name is not empty').not().notEmpty(),
    body('listdinner.*.description', 'The name must be string').isString().isLength({ min: 5 }).withMessage('must be at least 5 chars long')
     
];

const arrayValidateGet = [
    body('offset').isNumeric().withMessage('Offset must be numeric'),
    body('limit').isNumeric().withMessage('Limit must be numeric'),
    body('author').isString().withMessage('Author must be string'),
]

const arrayValidateParam = [
    param('id').custom(id => {
        return Dinner.getOneDinner(id).then(data => {
            if (!data) {
                return Promise.reject('Dinner is not exist');
            }
        })
    })
];

const arrayValidateUpdate = arrayValidate.concat(arrayValidateParam);

const arrayValidateDelete = [
    body('listId', 'List delete ObjectId array min >= 1').not().notEmpty(),
    body('listId.*').custom(id => {
        return Dinner.getOneDinner(id).then(data => {
            if (!data) {
                return Promise.reject('Dinner is not exist');
            }
        })
    })
];
const validateGetDinner = () => {
    return arrayValidateGet;
}

const validateCreateDinner = () => {
    return arrayValidate;
};

const validateUpdateDinner = () => {
    return [...arrayValidateParam, ...arrayValidate];
}

const validateDeleteDinner = () => {
    return arrayValidateDelete;
}


module.exports = {
    validateCreateDinner : validateCreateDinner,
    validateUpdateDinner : validateUpdateDinner,
    validateDeleteDinner : validateDeleteDinner,
    validateGetDinner : validateGetDinner
}