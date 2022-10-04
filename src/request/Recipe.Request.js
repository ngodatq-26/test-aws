const { body, checkBody, check, param, } = require('express-validator');
const expressValidator = require("express-validator");
const { Recipe } = require('../models/Recipe.Schema');

const validateRecipe = function() {
	return [
		
	];
};

const arrayValidateParam = [
    param('id').custom(id => {
        return Recipe.getOne(id).then(data => {
            if (!data) {
                return Promise.reject('Recipe does not exist');
            }
        })
    })
];

const validateUpdate = () => {
    return [...arrayValidateParam];
}

module.exports = {
	validateRecipe: validateRecipe,
	validateUpdate: validateUpdate,
};