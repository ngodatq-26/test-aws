const {Schema} = require('mongoose');
const mongoose = require('mongoose')
const utils = require('../utils/Constant');

const dinnerSchema = new Schema({
    title : {
        type : String,
        required : true,
        default : ""
    },
    dinner_list : {
        type : Array,
        required : false,
    },
    author_id : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : utils.models.users
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type: Date,
        default: Date.now
    },
});

dinnerSchema.static('getAllDinner', async function(skip, limit, author_id) {
    if(!author_id) {
        return await this.find().limit(limit).skip(skip);
    } else return await this.find({
        author_id : mongoose.Types.ObjectId(author_id.trim())
    }).limit(limit).skip(skip);
});

dinnerSchema.static('getOneDinner', async function(ObjectId) {
    return this.findById(mongoose.Types.ObjectId(ObjectId.trim()));
});

dinnerSchema.static('saveNewDinner', async function (title, listdinner, author_id) {
    const Dinner = new this({
        title : title,
        listdinner : listdinner,
        author_id : mongoose.Types.ObjectId(author_id.trim())
    });
    Dinner.save();
});

dinnerSchema.static('updateOneDinner', async function(ObjectId, update) {
    return await this.findByIdAndUpdate(mongoose.Types.ObjectId(ObjectId), update);
});

dinnerSchema.static('deleteOneDinner', async function(ObjectId) {
    return await this.findByIdAndRemove(mongoose.Types.ObjectId(ObjectId));
});

dinnerSchema.static('deleteDinnerByAuthorId', async function(authorId) {
    return await this.findByIdAndRemove(mongoose.Types.ObjectId(authorId));
});

const Dinner = mongoose.model(utils.models.dinner, dinnerSchema);

module.exports = {
    Dinner : Dinner
}