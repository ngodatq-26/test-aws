const { body, param } = require('express-validator');
const expressValidator = require('express-validator');
const { News } = require('../models/News.Schema');

const validateAttributes = [
	body('title', 'Title is empty').not().notEmpty(),
];

const validateId = [
	param('id').custom(id => {
		return News.getOne(id).then(data => {
			if (!data) {
				return Promise.reject('News does not exist');
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