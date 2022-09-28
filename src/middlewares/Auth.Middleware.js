const jwtHelper = require('./jwt/Jwt');
const debug = console.log.bind(console);
const config = require('../config/Config.Env');

const accessTokenLife = config.JWT_TIME_LIFE;
const secretKey = config.SECRET_JWT_KEY;
const refeshTokenLife = config.REFRESH_TIME_LIFE;

module.exports = {
    checkJwtMiddleware : async (req, res, next) => {
        var token = req.body.token || req.query.token || req.headers.authorization;

        if(token) {
                token = token.replace("Bearer ", "");

                try {
                        const decoded = await jwtHelper.verifyToken(token, secretKey);
                        req.decoded = decoded;
                        next();

                    } catch (err) {
                        
                        return res.status(401).send({
                            status : 401,
                            message : "Unauthorized",
                            data : null
                    });
                }
        } else {
            return res.status(403).send({
                status : 403,
                message : "No token provided",
                data : null,
            })
        }
    }
}