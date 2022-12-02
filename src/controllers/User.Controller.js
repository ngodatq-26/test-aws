const db = require("../config/Connect.Mongo");
const { User } = require("../models/User.Schema");
const { HandleResponse } = require("../utils/HandleResponse");
const { validationResult } = require("express-validator");
const config = require('../config/Config.Env');
const { RequestUser } = require('../utils/RequestUser');

module.exports = {
  allUsers: async (req, res, next) => {
    const { role } = await RequestUser(req);
    if (role !== 1) {
			return res.status(401).json({
				status: 401,
				message: 'You are unauthorized',
				data: {
				},
			})
		}
    try {
      const account = await User.findByEmail(req.body.email);
      return res.status(200).json({
        status: 200,
        message: "find successfully",
        data: { 
          account,
        }
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
  updateOne: async (req, res, next) => {
    const user = await RequestUser(req);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(HandleResponse(400, errors.array(), null));
      }

      if (user.role !== 1 && user._id != res.params.id) {
        return res.status(401).json({
          status: 401,
          message: 'You are not authorized',
          data: {
          },
        })
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
    const { role } = await RequestUser(req);
    if (role !== 1) {
			return res.status(401).json({
				status: 401,
				message: 'You are unauthorized',
				data: {
				},
			})
		}
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
      var user = await RequestUser(req);
      return res.status(200).json(HandleResponse(200,'successfully', {data: user}));
    } catch (err) {
      console.log(err)
      return res.status(400).json(HandleResponse(400, err, null));
    }
  }
};
