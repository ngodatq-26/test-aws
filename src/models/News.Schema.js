const { Schema, mongo } = require('mongoose');
const mongoose = require('mongoose');
const utils = require('../utils/Constant');

const newsSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: String,
	pictures: [ String ],
	author: {
		type: Schema.Types.ObjectId,
		// required: true,
	},
});

// STATIC
newsSchema.static('getAll', async function() {
	return await this.find();
})

newsSchema.static('getOne', async function(id) {
	return await this.findById(mongoose.Types.ObjectId(id));
});

newsSchema.static('updateOne', async function(id, update) {
	return await this.findByIdAndUpdate(mongoose.Types.ObjectId(id), update, { new: true });
});

newsSchema.static('deleteOne', async function(id) {
	return await this.findByIdAndDelete(mongoose.Types.ObjectId(id));
});

const News = mongoose.model(utils.models.news, newsSchema);

module.exports = {
	News: News,
};
