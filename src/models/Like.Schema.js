const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const utils = require('../utils/Constant');

const likeSchema = new Schema({
	user_ids: [Schema.Types.ObjectId],
	object_id: Schema.Types.ObjectId,
});

// STATIC
likeSchema.static('getAll', async function() {
	return await this.find();
});

likeSchema.static('getOne', async function(id) {
	return await this.findById(mongoose.Types.ObjectId(id));
});

likeSchema.static('like', async function(attrs) {
	const { user_id, object_id } = attrs;
	var like = await this.findOne({object_id});
	if (!like) {
		like = new this({
			user_ids: [user_id],
			object_id,
		});
	} else {
		const { user_ids } = like;
		if (!user_ids.includes(user_id)) {
			user_ids.push(user_id);
		}
	}
	await like.save();
	return like;
});

likeSchema.static('unlike', async function(attrs) {
	const { user_id, object_id } = attrs;
	var like = await this.findOne({object_id});
	if (like) {
		const { user_ids } = like;
		const index = user_ids.indexOf(user_id);
		if (index > -1) {
			user_ids.splice(index, 1);
		}
		await like.save();
	}
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