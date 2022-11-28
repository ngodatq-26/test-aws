const { body, checkBody, check, param, } = require('express-validator');
const expressValidator = require("express-validator");
const { Recipe } = require('../models/Recipe.Schema');
const mongoose = require('mongoose');
const { User } = require('../models/User.Schema');

const validateRecipe = function() {
	return [
		
	];
};

const validateAttributes = [
    body('name', 'Name is empty').not().notEmpty(),
    body('author_id').custom(author_id => {
        return User.findUserByObjectId(author_id).then(data => {
            if (!data) {
                return Promise.reject('Author does not exist');
            }
        })
    }),
];

const arrayValidateParam = [
    param('id').custom(id => {
        return Recipe.getOneRecipe(id).then(data => {
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