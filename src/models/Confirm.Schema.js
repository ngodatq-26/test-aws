const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const confirmSchema = new Schema({
    email: String,
    password: String,
    otp : {
        type : String,
        default : null,
    }
});

confirmSchema.static('getOtp', function (email, password) {
    return this.find({
        email: new RegExp(email, "i"),
        password: password,
    }).sort({ $natural: -1 }).limit(1);
})

const Confirm = mongoose.model('confirm-email', confirmSchema);

module.exports = {
    Confirm : Confirm
}