const { Recipe } = require('../models/Recipe.Schema');
const { validationResult } = require("express-validator");
// const config = require('../config/Config.Env');

module.exports = {
	get: async (req, res, next) => {
		try {
			if (req.params.id) {
				const recipe = await Recipe.getOne(req.params.id);
				if (!recipe) {
					return res.status(400).json({
						status: 400,
						message: 'Recipe not found',
						data: null,
					});
				}
	
				return res.status(200).json({
					status: 200,
					message: 'Recipe found',
					data: {
						recipe: recipe,
					},
				});
			}

			const recipes = await Recipe.getAll();
			return res.status(200).json({
				status: 200,
				message: 'Got all',
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

			const recipe = new Recipe(req.body);

			await recipe.save();

			return res.status(200).json({
				status: 200,
				message: 'Created successfully',
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
			const recipe = await Recipe.updateOne(id, req.body);

			return res.status(200).json({
				status: 200,
				message: 'Updated successfully',
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

			const recipe = await Recipe.deleteOne(id);

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