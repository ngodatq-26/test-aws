const { body, checkBody, check, param, } = require('express-validator');
const expressValidator = require("express-validator");
const { Recipe } = require('../models/Recipe.Schema');
const mongoose = require('mongoose');

const validateRecipe = function() {
	return [
		
	];
};

const validateAttributes = [
    body('name', 'Name is empty').not().notEmpty(),
    body('author_id', 'Author ID is empty').optional({Falsy: true}).custom(author_id => {
        if(!mongoose.Types.ObjectId.isValid(author_id)) {
            return Promise.reject('Author ID is invalid');
        }
    })
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