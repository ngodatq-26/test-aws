const { body, param } = require('express-validator');
const expressValidator = require('express-validator');
const { Book } = require('../models/Book.Schema');

const validateAttributes = [
	body('title', 'Book title is empty').not().notEmpty(),
];

const validateId = [
	param('id').custom(id => {
		return Book.getOne(id).then(data => {
			if (!data) {
				return Promise.reject('Book does not exist');
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