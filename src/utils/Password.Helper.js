const bcryptjs = require('bcryptjs');

//mã hóa mật khẩu
const hashPassword = (password) => {
   return new Promise(function(resolve,reject) {
       bcryptjs.genSalt(10, function (err, salt) {
           bcryptjs.hash(password, salt, function (err, hash) {
               if (err) {
                   reject(err);
               }
               resolve(hash);
           });
       });
   });
};

//so sánh mật khẩu đã mã hóa
const comparePassword = (password, hash) => {
    return new Promise(function(resolve, reject) {
        bcryptjs.compare(password, hash, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
                console.log(res);
            };
        });
    });
    
};

module.exports = {
    hashPassword : hashPassword,
    comparePassword : comparePassword
}