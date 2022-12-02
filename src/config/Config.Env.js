const { config } = require('dotenv');

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
    APP_PORT : process.env.APP_PORT,
    DOMAIN_APP: process.env.DOMAIN_APP,

    //jwt 
    REFRESH_SECRET_JWT_KEY: process.env.REFRESH_SECRET_JWT_KEY,
    SECRET_JWT_KEY : process.env.SECRET_JWT_KEY,
    JWT_TIME_LIFE : process.env.JWT_TIME_LIFE,
    REFRESH_TIME_LIFE : process.env.REFRESH_TIME_LIFE,
    
    //mail
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_HOST,
    MAIL_SECURE: process.env.MAIL_SECURE,

    //aws_mail
    AWS_SMTP_ENDPOINT : process.env.AWS_SMTP_ENDPOINT,
    AWS_PORT : process.env.APP_PORT,
    AWS_SMTP_USERNAME : process.env.AWS_SMTP_USERNAME,
    AWS_SMTP_PASSWORD : process.env.AWS_SMTP_PASSWORD,
    SES_AWS_ACCESS_KEY_ID : process.env.SES_AWS_ACCESS_KEY_ID,
    SES_AWS_SECRET_ACCESS_KEY : process.env.SES_AWS_SECRET_ACCESS_KEY,
    SES_REGION : process.env.SES_REGION,

    //google
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,

    //AWS S3
    AWS_BUCKET : process.env.AWS_BUCKET,
    AWS_REGION : process.env.AWS_REGION,
    AWS_ACCESS_KEY : process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY : process.env.AWS_SECRET_KEY,
}
