const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const utils = require('../utils/Constant');

const aboutSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	link: String,
});

// STATIC
aboutSchema.static('getAll', async function() {
	return await this.find();
});

aboutSchema.static('getOne', async function(id) {
	return await this.findById(mongoose.Types.ObjectId(id));
});

aboutSchema.static('createOne', async function(attrs) {
	const about = new this(attrs);
	await about.save();
	return about;
});

aboutSchema.static('updateOne', async function(id, attrs) {
	return this.findByIdAndUpdate(mongoose.Types.ObjectId(id), attrs, {new: true});
});

aboutSchema.static('deleteOne', async function(id) {
	return this.findByIdAndDelete(mongoose.Types.ObjectId(id));
});

const About = mongoose.model(utils.models.about, aboutSchema);

module.exports = {
	About: About,
};