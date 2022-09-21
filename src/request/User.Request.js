const { body, checkBody, } = require('express-validator');
const expressValidator = require("express-validator");


function userRequest(req, user) {
    req.checkBody("email", "Email is required").notEmpty();
}

module.exports = {
    userRequest : userRequest
}