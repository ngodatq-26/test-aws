const { Comment } = require('../models/Comment.Schema');
const { validationResult } = require('express-validator');

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const cmts = await Comment.getAll();
			return res.status(200).json({
				status: 200,
				message: 'Got all',
				data: cmts,
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
			const cmt = await Comment.getOne(id);
			if (!cmt) {
				return res.status(400).json({
					status: 400,
					message: 'Comment not found',
					data: null,
				});
			}
			return res.status(200).json({
				status: 200,
				message: 'Comment found',
				data: cmt,
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

			const cmt = await Comment.createOne(req.body);
			return res.status(200).json({
				status: 200,
				message: 'Created successfully',
				data: cmt,
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
			const cmt = await Comment.updateOne(id, req.body);
			return res.status(200).json({
				status: 200,
				message: 'Updated successfully',
				data: cmt,
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

			const id = req.params.id;
			const cmt = await Comment.deleteOne(id);
			return res.status(200).json({
				status: 200,
				message: 'Deleted successfully',
				data: cmt,
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