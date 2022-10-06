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
recipeSchema.static('getAll', async function() {
	return this.find();
});

recipeSchema.static('getOne', async function(ObjectId) {
    return this.findById(mongoose.Types.ObjectId(ObjectId));
});

// recipeSchema.static('createOne', async function(attrs) {
// 	if (attrs.name) {

// 	}
// 	return await this.create(attributes);
// });

recipeSchema.static('updateOne', async function(ObjectId, update) {
    return await this.findByIdAndUpdate(mongoose.Types.ObjectId(ObjectId), update, { new: true });
});

recipeSchema.static('deleteOne', async function(ObjectId) {
    return await this.findByIdAndDelete(mongoose.Types.ObjectId(ObjectId));
});

const Recipe = mongoose.model(utils.models.recipe, recipeSchema);

module.exports = {
	Recipe: Recipe,
};