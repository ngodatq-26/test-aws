const cors = require('cors');
const config = require('../../config/Config.Env');

const corsOptions = {
    origin : config.APP_DOMAIN,
    optionsSuccessStatus: 200
}

module.exports = {
    cors : cors(corsOptions),
}