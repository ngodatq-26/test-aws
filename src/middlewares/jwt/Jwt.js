const jwt = require('jsonwebtoken');

const generateToken = (user, secretKey, accessTokenLife) => {
    return new Promise((resolve, reject) => {
        const payload = {
            data : user,
        };
        const options = {
            algorithm : "HS256",
            expiresIn : accessTokenLife
        }

        jwt.sign(payload, secretKey, options, (error, token) => {
            if (error) {
                return reject(error);
            }
            resolve(token);
        });
    })
}

const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if(error) {
                reject(error);
            } 
            resolve(decoded);
        })
    });
}

module.exports = {
    generateToken : generateToken,
    verifyToken : verifyToken,
};