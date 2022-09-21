const mongoose = require('mongoose');

module.exports = (function () {
    let connectInstance;

    function getInstance() {
        return new Promise(function (resolve, reject) {
            if(connectInstance) {
                console.log("monogoDB is connected")
                return resolve(connectInstance);
            }

            const options = {
                autoIndex : true,
                maxPoolSize : 10,
                autoCreate : true
            }

            connectInstance = mongoose.connect('mongodb+srv://ngodatq26:ngodatq26@cluster0.cprksny.mongodb.net/nodejs_app?retryWrites=true&w=majority', options, function(error) {
                console.log("connect error");
                return reject(error);
            });

            return resolve(connectInstance);
        })
    }

    return getInstance;
})();