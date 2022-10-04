const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const utils = require('../utils/Constant');

const toolSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	title: String,
	listtool: [
		{
			name: String,
			picture: String,
			rate: Number,
			pros: String,
			cons: String,
		}
	],
	author: {
		type: Schema.Types.ObjectId,
	},
});

// STATIC
toolSchema.static('getAll', async function() {
	return await this.find({});
});

toolSchema.static('getOne', async function(id) {
	return await this.findOne(mongoose.Types.ObjectId(id));
});

toolSchema.static('updateOne', async function(id, update) {
	return await this.findByIdAndUpdate(mongoose.Types.ObjectId(id), update);
});

toolSchema.static('deleteOne', async function(id) {
	return await this.findByIdAndDelete(mongoose.Types.ObjectId(id));
});

const Tool = mongoose.model(utils.models.tool, toolSchema);

module.exports = {
	Tool: Tool,
};