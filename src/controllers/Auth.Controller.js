const { validationResult } = require("express-validator");
const { User } = require("../models/User.Schema");
const { comparePassword, hashPassword } = require("../utils/Password.Helper");
const db = require('../config/Connect.Mongo');
const config = require('../config/Config.Env');
const jwtHelper = require('../middlewares/jwt/Jwt');
const { sendMail } = require('../services/email/SendMailV2.Services');
const SendMailV2Services = require("../services/email/SendMailV2.Services");
const {HandleResponse} = require("../utils/HandleResponse");
const otpGenerator = require('otp-generator');
const { Confirm } = require("../models/Confirm.Schema");
const refreshSecretKey = config.REFRESH_SECRET_JWT_KEY;
const secretKey = config.SECRET_JWT_KEY;
const accessTokenLife = config.JWT_TIME_LIFE;
const refeshTokenLife = config.REFRESH_TIME_LIFE;


module.exports = {
    //controller login
    login: async (req, res, next) => {
        try {
            //validate dữ liệu trước khi xử lý 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(200).json({ 
                    status : 400,
                    message : errors.array(),
                    data : null,
                });
            }
        
            //kiểm tra email có tồn tại hay không
            var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

            const account = await User.findByEmail(req.body.email);
            if(!account) {
                return res.status(200).json({
                    status : 400,
                    message : "tài khoản này không tồn tại !",
                })
            }

            //nếu email tồn tại, kiểm tra password có đúng hay không
            if(!comparePassword(req.body.password, account.password)) {
                return res.status(200).json({
                    status: 400,
                    message: "Sai mật khẩu!",
                })
            }

            const userData = {
                email : req.body.email,
                password : req.body.password
            }

            const accessToken = await jwtHelper.generateToken(userData, secretKey, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(userData, refreshSecretKey, refeshTokenLife);

            return res.status(200).json({
                status : 200,
                message : 'login successfully!!!',
                data : {
                    email : req.body.email,
                    password : req.body.password,
                    accessToken : accessToken,
                    refreshToken : refreshToken,
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
            //validate dữ liệu trước khi xử lý
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    message: errors.array(),
                    data: null,
                })
            } 

            //kiểm tra xem email đã được sử dụng hay chưa;
            const email = req.body.email;
            
            const account = await User.findByEmail(req.body.email);

            if (account) {
                return res.status(400).json({
                    status: 400,
                    message: 'email đã tồn tại, vui lòng đăng ký bằng email khác!',
                    data: null
                })
            }
            
            const otp = otpGenerator.generate(7, { upperCaseAlphabets: false, specialChars: false });

            const confirm = new Confirm({
                email : req.body.email,
                password : req.body.password,
                otp : otp
            });
            confirm.save();

            const data = await SendMailV2Services.sendMail(req.body.email, otp);

            return res.status(200).json({
                status: 200,
                message: 'Vui lòng chờ xác thực email',
                data: null
            })
            
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                status: 400,
                message: err,
                data: null
            })
        }
    },

    //refresh, return new access token 
    refreshTokenController : async (req, res, next) => {
        const refreshTokenFromClient = req.body.refreshToken;

        if(refreshTokenFromClient) {
            try {
                 const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshSecretKey);
                 const userData = decoded.data;

                 const accessToken = await jwtHelper.generateToken(userData, secretKey, accessTokenLife);

                 return res.status(200).json({
                    status : 200,
                    message : "get new access token successfully!",
                    data : accessToken,
                 })
            } catch (error) {
                
                return res.status(403).json({
                    status : 403,
                    message : 'Invalid refresh token',
                })
            }
        } else {
            return res.status(403).json({
                status: 403,
                message: 'No token provided',
            })
        }
    },

    //controller logout
    logout: async (req, res, next) => {

    },

    confirmEmail : async (req, res, next) => {
        try{
            const otpCofirm  = req.body.otp;
            const checkUser = await Confirm.getOtp(req.body.email, req.body.password);

            if (otpCofirm == checkUser[0].otp) {
                hashPassword(req.body.password).then(async (password) => {

                    const user = new User({
                        email: req.body.email,
                        password: password
                    })
                    await user.save();

                    return res.status(200).json({
                        status: 200,
                        message: 'register successfully!!!',
                        data: {
                            email: req.body.email,
                            password: req.body.password
                        }
                    });

                }).catch(function (err) {
                    return res.status(400).json({
                        status: 400,
                        message: err,
                        data: null
                    })
                });

            } else {
                return res.status(401).json(HandleResponse(401, 'Lỗi xác thực otp', null));
            }
        } catch (err) {
            return res.status(400).json(HandleResponse(400, 'Lỗi error', null));
        }
    },
}
