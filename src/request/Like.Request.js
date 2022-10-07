const { body, param } = require('express-validator');
const expressValidator = require('express-validator');
const { Like } = require('../models/Like.Schema');

const validateAttributes = [
	body('user_id', 'User ID is empty').not().notEmpty(),
];

const validateId = [
	param('id').custom(id => {
		return Like.getOne(id).then(data => {
			if (!data) {
				return Promise.reject('Like does not exist');
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