const {Schema} = require('mongoose');
const mongoose = require('mongoose')
const utils = require('../utils/Constant');

const dinnerSchema = new Schema({
    title : {
        type : String,
        required : true,
        default : ""
    },
    listdinner : {
        type : Array,
        required : false,
    },
    author : {
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

dinnerSchema.static('getAllDinner', async function() {
    return await this.find();
});

dinnerSchema.static('getOneDinner', async function(ObjectId) {
    return this.findById(mongoose.Types.ObjectId(ObjectId.trim()));
});

dinnerSchema.static('saveNewDinner', async function (title, listdinner, author) {
    const Dinner = new this({
        title : title,
        listdinner : listdinner,
        author : mongoose.Types.ObjectId(author.trim())
    });
    Dinner.save();
});

dinnerSchema.static('updateOneDinner', async function(ObjectId, update) {
    return await this.findByIdAndUpdate(mongoose.Types.ObjectId(ObjectId), update);
});

dinnerSchema.static('deleteOneDinner', async function(ObjectId) {
    return await this.findByIdAndRemove(mongoose.Types.ObjectId(ObjectId));
});

const Dinner = mongoose.model(utils.models.dinner, dinnerSchema);

module.exports = {
    Dinner : Dinner
}