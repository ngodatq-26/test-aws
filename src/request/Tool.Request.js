const { body, param, } = require('express-validator');
const expressValidator = require('express-validator');
const { Tool } = require('../models/Tool.Schema');

const validateAttributes = [
	body('title', 'Title is empty').not().notEmpty(),
];

const validateId = [
	param('id').custom(id => {
		return Tool.getOne(id).then(data => {
			if (!data) {
				return Promise.reject('Tool does not exist');
			}
		});
	}),
];

const validateCreate = () => {
	return validateAttributes;
};

const validateUpdate = () => {
	return validateId;
};

module.exports = {
	validateCreate: validateCreate,
	validateUpdate: validateUpdate,
	validataDelete: validateUpdate,
};