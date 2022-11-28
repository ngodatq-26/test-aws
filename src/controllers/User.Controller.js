const db = require("../config/Connect.Mongo");
const { User } = require("../models/User.Schema");
const { HandleResponse } = require("../utils/HandleResponse");
const { validationResult } = require("express-validator");
const jwtHelper = require('../middlewares/jwt/Jwt');
const config = require('../config/Config.Env');

const secretKey = config.SECRET_JWT_KEY;
module.exports = {
  allUsers: async (req, res, next) => {
    try {
      const account = await User.findByEmail(req.body.email);
      return res.status(200).json({
        status: 200,
        message: "find successfully",
        data: account,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 400,
        message: err,
        data: null,
      });
    }
  },

  //Tìm kiếm user theo email,phone,name
  searchUsers: async (req, res, next) => {
    try {
      const account = await User.findByEmailAndPhoneAndName(
        req.body.email,
        req.body.phone,
        req.body.name
      );
      return res.status(200).json({
        status: 200,
        message: "find successfully",
        data: account,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 400,
        message: err,
        data: null,
      });
    }
  },

  //sửa,cập nhật 1 user
  updateOne: (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(HandleResponse(400, errors.array(), null));
      }

      const update = User.updateOneUser(req.params.id, req.body);
      return res
        .status(200)
        .json(HandleResponse(200, "Update one successfully", update));
    } catch (error) {
      return res.status(400).json(HandleResponse(400, error, null));
    }
  },

  //Xóa user cần xóa
  deleteOne: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(HandleResponse(400, errors.array(), null));
      }

      const ObjectId = req.params.id;

      await User.deleteOneUser(ObjectId);

      const message = "Delete user successfully";
      return res.status(200).json(HandleResponse(200, message, null));
    } catch (error) {
      return res.status(400).json(HandleResponse(400, error, null));
    }
  },

  getUser : async (req, res, next) => {
    try {
      var token = req.body.token || req.query.token || req.headers.authorization;
      token = token.replace("Bearer ", "");
      const decoded = await jwtHelper.verifyToken(token, secretKey);
      return res.status(200).json(HandleResponse(200,'successfully', decoded));
    } catch (err) {
      console.log(err)
      return res.status(400).json(HandleResponse(400, err, null));
    }
  }
};
