const jwtHelper = require('../middlewares/jwt/Jwt');
const config = require('../config/Config.Env');
const secretKey = config.SECRET_JWT_KEY;

const RequestUser = async (req) => {
	var token = req.body.token || req.query.token || req.headers.authorization;
	token = token.replace("Bearer ", "");
	const decoded = await jwtHelper.verifyToken(token, secretKey);
	return decoded.data;
}

module.exports = { 
	RequestUser
};