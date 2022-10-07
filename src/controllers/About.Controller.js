const { About } = require('../models/About.Schema');
const { validationResult } = require('express-validator');

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const abouts = await About.getAll();
			return res.status(200).json({
				status: 200,
				message: 'Got all',
				data: abouts,
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
			const about = await About.getOne(id);
			if (!about) {
				return res.status(400).json({
					status: 400,
					message: 'About not found',
					data: null,
				});
			}
			return res.status(200).json({
				status: 200,
				message: 'About found',
				data: about,
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

			const about = await About.createOne(req.body);
			return res.status(200).json({
				status: 200,
				message: 'Created successfully',
				data: about,
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
			const about = await About.updateOne(id, req.body);
			return res.status(200).json({
				status: 200,
				message: 'Updated successfully',
				data: about,
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
			const about = await About.deleteOne(id);
			return res.status(200).json({
				status: 200,
				message: 'Deleted successfully',
				data: about,
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