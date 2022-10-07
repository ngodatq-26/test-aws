const { body, param } = require('express-validator');
const expressValidator = require('express-validator');
const { About } = require('../models/About.Schema');

const validateAttributes = [
	body('name', 'Name is empty').not().notEmpty(),
];

const validateId = [
	param('id').custom(id => {
		return About.getOne(id).then(data => {
			if (!data) {
				return Promise.reject('About does not exist');
			}
		});
	}),
];

const validateCreate = () => {
	return validateAttributes;
};

const validateUpdate = () => {
	return validateId;
}

const validateDelete = () => {
	return validateId;
}

module.exports = {
	validateCreate: validateCreate,
	validateUpdate: validateUpdate,
	validataDelete: validateDelete,
}