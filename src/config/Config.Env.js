const dotenv = require('dotenv').config();

module.exports = {
    //database
    DATABASE_USERNAME : process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD : process.env.DATABASE_PASSWORD,
    DATABASE_HOST : process.env.DATABASE_HOST,
    DATABASE_PORT : process.env.DATABASE_PORT,
    DATABASE_NAME : process.env.DATABASE_NAME,
    DATABASE_URI : process.env.DATABASE_URI,

    //app_main
    APP_PORT : process.env.APP_PORT
}
