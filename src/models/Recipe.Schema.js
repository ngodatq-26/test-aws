const { query } = require('express');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { recipe } = require('../api/Routes');
const utils = require('../utils/Constant');

const cookingMethods = ["baking", "braising", "canning", "frying",  "grill"];
const meals = ['breakfast', 'lunch', 'supper', 'dinner', ];
const difficulties = ['easy', 'medium', 'hard'];

const recipeSchema = new Schema ({
	name :{
		type: String,
		required: true,
	},
	description : String,
	countries: [String],
	pictures: [String],
	video: String,
	meals: {
		type: [{
			type: String,
			enum: meals,
			message: '{VALUE} is not supported'
		}],
		// required: true,
	},
	difficulty: {
		type: String,
		enum: difficulties,
		// requied: true,
		message: '{VALUE} is not supported'
	},
	time: {
		preptime: {
			type: Number,
			// required: true,
		},
		cooktime: {
			type: Number,
			// required: true,
		},
		yields: {
			type: String,
			// required: true,
		},
	},
	calories: {
		type: Schema.Types.Decimal128,
		// required: true,
	},
	method: {
		type: String,
		enum: cookingMethods,
		// required: true,
		message: '{VALUE} is not supported'
	},
	ingredients: [{
		name: String,
		amount: Number,
		unit: String,
	}],
	category_ids: [
		{
			type: Schema.Types.ObjectId,
		}
	],
	steps: [
		{
			order: Number,
			content: String,
			image: String,
		}
	],
	author_id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
    since : {
        type : Date,
        default : Date.now
    },
    last_updated : {
        type: Date,
        default: Date.now
    },
});

recipeSchema.method = {
	
};

// STATIC
recipeSchema.static('getAll', async function(attrs) {
	var { name, author_id, category_id } = attrs;
	var query = {
		...(name && {name: { $regex: new RegExp(name, "i") }}),
		...(author_id && {author_id: author_id}),
		...(category_id && {category_ids: category_id})
	};
	
	return await this.find(query);
});

recipeSchema.static('getOneRecipe', async function(ObjectId) {
    return await this.findById(mongoose.Types.ObjectId(ObjectId));
});

recipeSchema.static('createOneRecipe', async function(attrs, user) {
	const attributes = {
		...attrs,
		author_id: user._id
	}
	const recipe = new Recipe(attributes);
	await recipe.save();
	return recipe;
});

recipeSchema.static('updateOneRecipe', async function(id, update) {
    return await this.findByIdAndUpdate(mongoose.Types.ObjectId(id), update, { new: true });
});

recipeSchema.static('deleteOneRecipe', async function(id) {
    return await this.findByIdAndDelete(mongoose.Types.ObjectId(id));
});

const Recipe = mongoose.model(utils.models.recipe, recipeSchema);

module.exports = {
	Recipe: Recipe,
};