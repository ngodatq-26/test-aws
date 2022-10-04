const { Recipe } = require('../models/Recipe.Schema');
const { validationResult } = require("express-validator");
// const config = require('../config/Config.Env');

module.exports = {
	all: async (req, res, next) => {
		try {
			const recipes = await Recipe.find({});
			return res.status(200).json({
				status: 200,
				message: 'got all',
				data: recipes,
			})
		} catch(err) {
			// console.log(err);
			return res.status(400).json({
				status: 400,
				message: err,
				data: null,
			})
		}
	},

	create: async (req, res, next) => {
		try {
			const recipe = new Recipe({
				name: req.body.name,
			});

			await recipe.save();

			return res.status(200).json({
				status: 200,
				message: 'created successfully',
				data: {
					recipe: recipe,
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

	get: async(req, res, next) => {
		try {
			// const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	return res.status(400).json({
			// 		status: 400,
			// 		message: errors.array(),
			// 		data: null,
			// 	});
			// }

			const id = req.params.id;

			const recipe = await Recipe.findById(id);

			if (!recipe) {
				return res.status(400).json({
					status: 400,
					message: 'Recipe not found',
					data: null,
				});
			}

			return res.status(200).json({
				status: 200,
				message: 'found',
				data: {
					recipe: recipe,
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

	update: async(req, res, next) => {
		try {
			// const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	return res.status(400).json({
			// 		status: 400,
			// 		message: errors.array(),
			// 		data: null,
			// 	});
			// }

			const id = req.params.id;

			const recipe = await Recipe.findById(id);

			if (!recipe) {
				return res.status(400).json({
					status: 400,
					message: 'Recipe not found',
					data: null,
				});
			}

			if (req.body.name) {
				recipe.name = req.body.name;
			}

			await recipe.save();

			return res.status(200).json({
				status: 200,
				message: 'updated successfully',
				data: {
					recipe: recipe,
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

	delete: async (req, res, next) => {
		try {
			// const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	return res.status(400).json({
			// 		status: 400,
			// 		message: errors.array(),
			// 		data: null,
			// 	});
			// }

			const id = req.params.id;

			const recipe = await Recipe.findById(id);

			if (!recipe) {
				return res.status(400).json({
					status: 400,
					message: 'Recipe not found',
					data: null,
				});
			}

			await recipe.delete();

			return res.status(200).json({
				status: 200,
				message: 'Deleted successfully',
				data: {
					recipe: recipe,
				},
			});
		} catch(err) {
			return res.status(400).json({
                status: 400,
                message: err,
                data: null,
            });
		}
	}
}