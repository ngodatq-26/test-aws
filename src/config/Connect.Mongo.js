const mongoose = require('mongoose');
const config = require('./Config.Env');

module.exports = (
    function () {
        function connect() {
            const options = {
                autoIndex: true,
                autoCreate: true,
                maxPoolSize: 10
            }

            //phần này nên chỉnh sửa thanh singleton
            return mongoose.connect(config.DATABASE_URI, options)
                .catch(error => {
                    console.log(error);
            }) 
        }

    return connect();
})();