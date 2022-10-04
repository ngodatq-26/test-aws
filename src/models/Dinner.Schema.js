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
})

const Dinner = mongoose.models(utils.models.dinner, dinnerSchema);