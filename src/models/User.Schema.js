const {Schema} = require('mongoose');
const mongoose = require('mongoose')

const userSchema = new Schema({
    email : String,
    password : String,
    name : {
        type : String,
        default : ''
    },
    phone : Number,
    date : {
        type : Date,
        default : Date.now
    },
    created_at : Date,
    updated_at : Date,
});

userSchema.method = {

};

userSchema.statics = {

};

const User = mongoose.model('users', userSchema)

module.exports = {
    User : User
}