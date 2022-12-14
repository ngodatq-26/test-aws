const { Recipe } = require('../models/Recipe.Schema');
const { validationResult } = require("express-validator");
const { RequestUser } = require('../utils/RequestUser');
// const config = require('../config/Config.Env');

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const recipes = await Recipe.getAll(req.body);
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

	getOne : async (req, res, next) => {
		try {
			const recipe = await Recipe.getOneRecipe(req.params.id);
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

			const user = await RequestUser(req);
			const recipe = await Recipe.createOneRecipe(req.body, user);

			return res.status(200).json({
				status: 200,
				message: 'Created successfully',
				data: {
					recipe: recipe,
				},
			});
		} catch(err) {
			console.log(err)
			return res.status(400).json({
                status: 400,
                message: attributes,
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
			const user = await RequestUser(req);
			const id = req.params.id;
			const recipe = await Recipe.getOneRecipe(id);
			if (user.role !== 1 && user._id != recipe.author_id) {
				return res.status(401).json({
					status: 401,
					message: 'You are not authorized',
					data: {
					},
				})
			}

			const new_recipe = await Recipe.updateOneRecipe(id, req.body);

			return res.status(200).json({
				status: 200,
				message: 'Updated successfully',
				data: {
					recipe: new_recipe,
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

			const user = await RequestUser(req);
			const id = req.params.id;
			const recipe = await Recipe.getOneRecipe(id);
			if (user.role !== 1 && user._id != recipe.author_id) {
				return res.status(401).json({
					status: 401,
					message: 'You are not authorized',
					data: {
					},
				})
			}

			const deleted_recipe = await Recipe.deleteOneRecipe(id);

			return res.status(200).json({
				status: 200,
				message: 'Deleted successfully',
				data: {
					recipe: deleted_recipe,
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