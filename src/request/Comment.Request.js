const { body, param } = require('express-validator');
const expressValidator = require('express-validator');
const { Comment } = require('../models/Comment.Schema');

const validateAttributes = [
	body('user', 'User is empty').not().notEmpty(),
];

const validateId = [
	param('id').custom(id => {
		return Comment.getOne(id).then(data => {
			if (!data) {
				return Promise.reject('Comment does not exist');
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