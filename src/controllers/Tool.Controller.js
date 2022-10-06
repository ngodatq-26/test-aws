const { Tool } = require('../models/Tool.Schema');
const { validationResult } = require('express-validator');

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const tools = await Tool.getAll();
			return res.status(200).json({
				status: 200,
				message: 'Got all',
				data: tools,
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
			const id = req.params.id;
			const tool = await Tool.getOne(id);

			if (!tool) {
				return res.status(400).json({
					status: 400,
					message: 'Tool not found',
					data: null,
				});
			}

			return res.status(200).json({
				status: 200,
				message: 'Tool found',
				data: tool,
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

			const tool = new Tool(req.body);
			await tool.save();

			return res.status(200).json({
				status: 200,
				message: 'Created successfully',
				data: tool,
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
			const tool = await Tool.updateOne(id, req.body);

			return res.status(200).json({
				status: 200,
				message: 'Updated successfully',
				data: {
					tool: tool,
				},
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
			const tool = await Tool.deleteOne(id);
			
			return res.status(200).json({
				status: 200,
				message: 'Deleted successfully',
				data: {
					tool: tool,
				},
			});
		} catch(err) {
			return res.status(400).json({
                status: 400,
                message: err,
                data: null,
            });
		}
	},
}