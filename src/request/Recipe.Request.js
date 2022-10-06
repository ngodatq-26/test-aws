const { body, checkBody, check, param, } = require('express-validator');
const expressValidator = require("express-validator");
const { Recipe } = require('../models/Recipe.Schema');

const validateRecipe = function() {
	return [
		
	];
};

const validateAttributes = [
    body('name', 'Name is empty').not().notEmpty(),
    // body('author', 'Author is empty').not().notEmpty(),
    // body('author').custom(author => {
    //     return User.findUserByObjectId(author).then(data => {
    //         if (!data) {
    //             return Promise.reject('Author does not exist');
    //         }
    //     })
    // }),
    // body('listdinner', 'List dinner array min >= 1').not().notEmpty(),
    // body('listdinner.*.name', 'The name is not empty').not().notEmpty(),
    // body('listdinner.*.name', 'The name must be string').isString().isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    // body('listdinner.*.description', 'The name is not empty').not().notEmpty(),
    // body('listdinner.*.description', 'The name must be string').isString().isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
];

const arrayValidateParam = [
    param('id').custom(id => {
        return Recipe.getOne(id).then(data => {
            if (!data) {
                return Promise.reject('Recipe does not exist');
            }
        })
    })
];

const validateCreate = () => {
    return validateAttributes;
}

const validateUpdate = () => {
    return arrayValidateParam;
}

module.exports = {
	validateUpdate: validateUpdate,
    validateCreate: validateCreate,
};