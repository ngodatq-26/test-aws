const {Schema} = require('mongoose');
const mongoose = require('mongoose')
const utils = require('../utils/Constant');

//nên xem xét đổi sang singleton hay không
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

//khai báo các phương thức instance cho userSchema
userSchema.method = {
    
};

//khai báo các phương thức static cho uerSchema
userSchema.static('findByEmail', function(email) {
    return this.find({
        email : new RegExp(email, 'i')
    });
});

const User = mongoose.model(utils.models.users, userSchema);

module.exports = {
    User : User
}