const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const utils = require('../utils/Constant');

const bookSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	book_list: [
		{
			name: String,
			discription: String,
			picture: String,
			price: Number,
			rate: {
				type: Number,
				min: 0.0,
				max: 5.0,
			},
		}
	],
	author_id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
});

// STATIC
bookSchema.static('getAll', async function() {
	return await this.find();
});

bookSchema.static('getOne', async function(id) {
	return await this.findById(mongoose.Types.ObjectId(id));
});

bookSchema.static('createOne', async function(attrs, user) {
	const book = new this({...attrs, author_id: user._id});
	await book.save();
	return book;
});

bookSchema.static('updateOne', async function(id, attrs) {
	return this.findByIdAndUpdate(mongoose.Types.ObjectId(id), attrs, {new: true});
});

bookSchema.static('deleteOne', async function(id) {
	return this.findByIdAndDelete(mongoose.Types.ObjectId(id));
});

const Book = mongoose.model(utils.models.book, bookSchema);

module.exports = {
	Book: Book,
};