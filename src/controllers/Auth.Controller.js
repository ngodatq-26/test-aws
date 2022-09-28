const { validationResult } = require("express-validator");
const { User } = require("../models/User.Schema");
const { comparePassword, hashPassword } = require("../utils/Password.Helper");
const db = require('../config/Connect.Mongo');
const config = require('../config/Config.Env');
const jwtHelper = require('../middlewares/jwt/Jwt');

const secretKey = config.SECRET_JWT_KEY;
const accessTokenLife = config.JWT_TIME_LIFE;
const refeshTokenLife = config.REFRESH_TIME_LIFE;

module.exports = {
    //controller login
    login: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ 
                    status : 400,
                    message : errors.array(),
                    data : null,
                });
            }

            const userData = {
                email : req.body.email,
                password : req.body.password
            }

            const accessToken = await jwtHelper.generateToken(userData, secretKey, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(userData, secretKey, refeshTokenLife);

            return res.status(200).json({
                status : 200,
                message : 'login successfully!!!',
                data : {
                    email : req.body.email,
                    password : req.body.password,
                    accessToken : accessToken,
                    refreshToken : refreshToken
                }
            });

        } catch (err) {
            return res.status(400).json({
                status : 400,
                message : err,
                data : null
            })
        }
    },

    //controller register
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

    //controller logout
    logout: async (req, res, next) => {

    }
}