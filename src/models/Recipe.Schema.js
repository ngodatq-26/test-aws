const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const utils = require('../utils/Constant');

const cookingMethods = ["baking", "braising", "canning", "frying",  "grill"];
const meals = ['breakfast', 'lunch', 'supper', 'dinner', ];
const difficulties = ['easy', 'medium', 'hard'];

const recipeSchema = new Schema ({
	name :{
		type: String,
		required: true,
	},
	country: [String],
	picture: [String],
	video: String,
	meal: {
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
	categories: [
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
	author: {
		type: Schema.Types.ObjectId,
		// required: true,
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
// recipeSchema.static('byCategory', function(category) {
// 	return this.find({
// 		category: new RegExp(category.id),
// 	});
// }) 
recipeSchema.static('getOne', async function(ObjectId) {
    return this.findById(mongoose.Types.ObjectId(ObjectId.trim()));
});

const Recipe = mongoose.model(utils.models.recipes, recipeSchema);

module.exports = {
	Recipe: Recipe,
};