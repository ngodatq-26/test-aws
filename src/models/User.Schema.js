const {Schema} = require('mongoose');
const mongoose = require('mongoose')

const userSchema = new Schema({
    email : String,
    password : String,
    name : {
        type : String,
        default : ''
    },
    phone : {
        type : Number,
        default : null
    },
    profile_image : {
        type : String,
        default : null
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

userSchema.method = {
    
};

userSchema.statics = {

};

const User = mongoose.model('users', userSchema)

module.exports = {
    User : User
}