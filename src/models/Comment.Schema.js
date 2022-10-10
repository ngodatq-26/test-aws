const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const utils = require('../utils/Constant');

const commentSchema = new Schema({
	user_id: Schema.Types.ObjectId,
	content: String,
	pictures: [ String ],
	parent_id: {
		type: Schema.Types.ObjectId,
		default: null,
	},
	object_id: Schema.Types.ObjectId,
});

// STATIC
commentSchema.static('getAll', async function() {
	return await this.find();
});

commentSchema.static('getOne', async function(id) {
	return await this.findById(mongoose.Types.ObjectId(id));
});

commentSchema.static('createOne', async function(attrs) {
	const comment = new this(attrs);
	await comment.save();
	return comment;
});

commentSchema.static('updateOne', async function(id, attrs) {
	return this.findByIdAndUpdate(mongoose.Types.ObjectId(id), attrs, {new: true});
});

commentSchema.static('deleteOne', async function(id) {
	return this.findByIdAndDelete(mongoose.Types.ObjectId(id));
});

const Comment = mongoose.model(utils.models.comment, commentSchema);

module.exports = {
	Comment: Comment,
};