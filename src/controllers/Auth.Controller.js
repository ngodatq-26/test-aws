const { validationResult } = require("express-validator");
const { User } = require("../models/User.Schema");
const { comparePassword, hashPassword } = require("../utils/Password.Helper");
const db = require('../config/Connect.Mongo');

module.exports = {
    login: (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ 
                    status : 400,
                    message : errors.array(),
                    data : null,
                });
            }

            return res.status(200).json({
                status : 200,
                message : 'login successfully!!!',
            });

        } catch (err) {
            return res.status(400).json({
                status : 400,
                message : err,
                data : null
            })
        }
    },

    register: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    message: errors.array(),
                    data: null,
                })
            } 
            const email = req.body.email;

            hashPassword(req.body.password).then(async (password) => {

                const user = new User({
                    email: email,
                    password: password
                })
                await user.save();

                return res.status(200).json({
                    status: 200,
                    message: 'register successfully!!!',
                    data: {
                        email: email,
                        password: password
                    }
                });
                
            }).catch(function(err) {
                return res.status(400).json({
                    status: 400,
                    message: err,
                    data: null
                })
            });
 
        } catch (err) {
            return res.status(400).json({
                status: 400,
                message: err,
                data: null
            })
        }
    },

    logout: async (req, res, next) => {

    }
}