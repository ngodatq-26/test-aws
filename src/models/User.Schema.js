const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const { user } = require("../api/Routes");
const utils = require("../utils/Constant");

//nên xem xét đổi sang singleton hay không
const userSchema = new Schema({
  email: String,
  password: String,
  name: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: null,
  },
  profile_image: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

//khai báo các phương thức instance cho userSchema
userSchema.method = {};

//khai báo các phương thức static cho uerSchema
//tìm kiếm tài khoản bằng email
userSchema.static("findByEmail", function (email) {
  return this.findOne({
    email: new RegExp(email, "i"),
  });
});

//tìm kiếm tài khoản bởi email và password
userSchema.static("findByEmailAndPassword", function (email, password) {
  return this.find({
    email: new RegExp(email, "i"),
    password: password,
  });
});

//tìm kiếm tài khoản bởi email, phone number, name
userSchema.static("findByEmailAndPhoneAndName", function (email, phone, name) {
  return this.find({
    email: new RegExp(email, "i"),
    //phone: { "$where": "function() { return $${phone}'.toString().match(/555/) != null; }" },
    phone: { $regex: new RegExp( phone, '^13'), $options: 'i' },
    name: new RegExp(name, "i"),
  });
});

//tìm kiếm tất cả ObjectId
userSchema.static("findAllObjectId", async function () {
  const arrObjectId = new Array();
  const allUser = await this.find({});

  for (let [key, value] of Object.entries(allUser)) {
    arrObjectId.push(value.id);
  }
  return arrObjectId;
});

//tìm kiếm tài khoản bằng ObjectId
userSchema.static("findUserByObjectId", async function (ObjectId) {
  return this.findById(mongoose.Types.ObjectId(ObjectId));
});

//cập nhật tài khoản người dùng
userSchema.static("updateOneUser", async function (ObjectId, update) {
  return await this.findByIdAndUpdate(
    mongoose.Types.ObjectId(ObjectId),
    update
  );
});

//Xóa tài khoản người dùng
userSchema.static("deleteOneUser", async function (ObjectId) {
  return await this.findByIdAndRemove(mongoose.Types.ObjectId(ObjectId));
});

userSchema.static("updatePassword", async function (ObjectId, password) {
  return await this.findByIdAndUpdate(
    mongoose.Types.ObjectId(ObjectId),
    password
  );
});

const User = mongoose.model(utils.models.users, userSchema);

module.exports = {
  User: User,
};
