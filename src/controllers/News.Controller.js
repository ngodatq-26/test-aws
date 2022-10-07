const { News } = require('../models/News.Schema');
const { validationResult } = require('express-validator');

module.exports = {
	getAll: async function(req, res, next) {
		try {
			const all_news = await News.getAll();
			return res.status(200).json({
				status: 200,
				message: 'Got all',
				data: all_news,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},

	getOne: async function(req, res, next) {
		try {
			const id = req.params.id;
			const news = await News.getOne(id);

			if (!news) {
				return res.status(400).json({
					status: 400,
					message: 'News not found',
					data: null,
				});
			}

			return res.status(200).json({
				status: 200,
				message: 'Tool found',
				data: news,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},

	createOne: async function(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					status: 400,
					message: errors.array(),
					data: null,
				});
			}

			const news = new News(req.body);
			await news.save();

			return res.status(200).json({
				status: 200,
				message: 'Created successfully',
				data: news,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},

	updateOne: async function(req, res, next) {
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
			const news = await News.updateOne(id, req.body);

			return res.status(200).json({
				status: 200,
				message: 'Updated successfully',
				data: news,
			});
		} catch(err) {
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			});
		}
	},

	deleteOne: async function(req, res, next) {
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
			const news = await News.deleteOne(id);
			return res.status(200).json({
				status: 200,
				message: 'Deleted successfully',
				data: news,
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