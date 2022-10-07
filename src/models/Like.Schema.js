const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const utils = require('../utils/Constant');

const likeSchema = new Schema({
	user: Schema.Types.ObjectId,
	object: Schema.Types.ObjectId,
});

// STATIC
likeSchema.static('getAll', async function() {
	return await this.find();
});

likeSchema.static('getOne', async function(id) {
	return await this.findById(mongoose.Types.ObjectId(id));
});

likeSchema.static('createOne', async function(attrs) {
	const like = new this(attrs);
	await like.save();
	return like;
});

likeSchema.static('updateOne', async function(id, attrs) {
	return this.findByIdAndUpdate(mongoose.Types.ObjectId(id), attrs, {new: true});
});

likeSchema.static('deleteOne', async function(id) {
	return this.findByIdAndDelete(mongoose.Types.ObjectId(id));
});

const Like = mongoose.model(utils.models.like, likeSchema);

module.exports = {
	Like: Like,
};