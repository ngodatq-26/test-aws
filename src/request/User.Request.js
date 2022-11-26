const { body, checkBody, check, param} = require("express-validator");
const expressValidator = require("express-validator");
const { User } = require("../models/User.Schema");

const validateLogin = () => {
  return [
    body("email", "Email is not empty").not().notEmpty(),
    body("email", "Invalid Email!").isEmail(),
    body("password", "Password more than 6 degits").isLength({ min: 6 }),
  ];
};

const validateRegister = () => {
  return [
    body("email", "Email is not empty").not().notEmpty(),
    body("email", "Invalid Email!").isEmail(),
    body("password", "Password more than 6 degits").isLength({ min: 6 }),
  ];
};

const validateUpdatePassword = () => {
  return [
    body('user_id', 'The user_id is not Empty').not().notEmpty(),
    body('user_id').custom(user_id => {
      return User.findUserByObjectId(user_id).then(data => {
        if (!data) {
          return Promise.reject('User does not exist');
        }
      })
    }),
    body("password", "Password more than 6 degits").isLength({ min: 6 }),
    body("newPassword", "Update Password more than 6 degits").isLength({ min: 6 })
  ];
}

const arrayValidate = [
    body('email', 'Email is not Empty').not().notEmpty(),
    body("email", "Invalid Email!").isEmail(),
    body('name', 'Name is not Empty').not().notEmpty(),
    body('phone', 'Phone number is not Empty').not().notEmpty(),
    body('profile_image', 'Profile image is not Empty').not().notEmpty()
];

const arrayValidateParam = [
    param('id').custom(id => {
        return User.findUserByObjectId(id).then(data => {
            if (!data) {
                return Promise.reject('User is not exist');
            }
        })
    })
];


const validateEmail = [body("email", "Invalid Email!").isEmail()];

const validateUpdateUser = () => {
    return [...arrayValidateParam, ...arrayValidate];
}

const validateDeleteUser = () => {
  return arrayValidateParam;
}

module.exports = {
  validateLogin: validateLogin,
  validateRegister: validateRegister,
  validateEmail: validateEmail,
  validateUpdateUser : validateUpdateUser,
  validateDeleteUser : validateDeleteUser,
  validateUpdatePassword : validateUpdatePassword,
};
