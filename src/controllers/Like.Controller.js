const { Like } = require('../models/Like.Schema');
const { validationResult } = require('express-validator');

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const likes = await Like.getAll();
			return res.status(200).json({
				status: 200,
				message: 'Got all',
				data: likes,
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
			const like = await Like.getOne(id);
			if (!like) {
				return res.status(400).json({
					status: 400,
					message: 'Like not found',
					data: null,
				});
			}
			return res.status(200).json({
				status: 200,
				message: 'Like found',
				data: like,
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

			const like = await Like.createOne(req.body);
			return res.status(200).json({
				status: 200,
				message: 'Created successfully',
				data: like,
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
			const like = await Like.updateOne(id, req.body);
			return res.status(200).json({
				status: 200,
				message: 'Updated successfully',
				data: like,
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
			const like = await Like.deleteOne(id);
			return res.status(200).json({
				status: 200,
				message: 'Deleted successfully',
				data: like,
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