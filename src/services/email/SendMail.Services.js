const nodemailer = require('nodemailer');
const config = require('../../config/Config.Env');

module.exports = {
    sendMail : async (mailReceive) => {

        const transporter = nodemailer.createTransport({
            host : config.MAIL_HOST,
            port : config.MAIL_PORT,
            auth : {
                user: config.MAIL_USER,
                pass : config.MAIL_PASSWORD
            }
        });


            const info = await transporter.sendMail({
                from: config.MAIL_USER,
                to: mailReceive,
                subject: "Register new account",
                text: "Hello new friend!",
                html:"<a>hello</a>"
            });

            console.log(info);
            nodemailer.getTestMessageUrl(info);
    }

}