const { body, checkBody, check, } = require('express-validator');
const expressValidator = require("express-validator");


const validateLogin = () => {
    return [
        body('email', 'Email is not empty').not().notEmpty(),
        body('email', 'Invalid Email!').isEmail(),
        body('password', 'Password more than 6 degits').isLength({min : 6}),
    ];
};

const validateRegister = () => {
    return [
        body('email', 'Email is not empty').not().notEmpty(),
        body('email', 'Invalid Email!').isEmail(),
        body('password', 'Password more than 6 degits').isLength({ min: 6 })
    ];
};

module.exports = {
    validateLogin : validateLogin,
    validateRegister : validateRegister
};