const { Book } = require('../models/Book.Schema');
const { validationResult } = require('express-validator');
const RequestUser = require('../utils/RequestUser');

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const books = await Book.getAll();
			return res.status(200).json({
				status: 200,
				message: 'Got all',
				data: books,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},

	getOne: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					status: 400,
					message: errors.array(),
					data: null,
				});
			}
			
			const id = req.params.id;
			const book = await Book.getOne(id);
			if (!book) {
				return res.status(400).json({
					status: 400,
					message: 'Book not found',
					data: null,
				});
			}
			return res.status(200).json({
				status: 200,
				message: 'Book found',
				data: book,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},

	createOne: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					status: 400,
					message: errors.array(),
					data: null,
				});
			}

			const user = RequestUser(req);
			const book = await Book.createOne(req.body, user);
			return res.status(200).json({
				status: 200,
				message: 'Created successfully',
				data: book,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},

	updateOne: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					status: 400,
					message: errors.array(),
					data: null,
				});
			}

			const id = req.params.id;
			const user = RequestUser(req);
			const book = await Book.getOne(id);
			if (user.role !== 1 && user._id != book.author_id) {
				return res.status(401).json({
					status: 401,
					message: 'You are not authorized',
					data: {
					},
				})
			}

			const new_book = await Book.updateOne(id, req.body, user);
			return res.status(200).json({
				status: 200,
				message: 'Updated successfully',
				data: new_book,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},

	deleteOne: async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					status: 400,
					message: errors.array(),
					data: null,
				});
			}

			const user = RequestUser(req);
			const id = req.params.id;
			const book = await Book.getOne(id);
			if (user.role !== 1 && user._id != book.author_id) {
				return res.status(401).json({
					status: 401,
					message: 'You are not authorized',
					data: {
					},
				})
			}
			const deleted_book = await Book.deleteOne(id, user);
			return res.status(200).json({
				status: 200,
				message: 'Deleted successfully',
				data: deleted_book,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},
};