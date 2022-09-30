const nodemailer = require('nodemailer');
const config = require('../../config/Config.Env');
const AWS = require('aws-sdk');
const sesTransport = require('nodemailer-ses-transport');

const sesConfig = {
    accessKeyId: config.SES_AWS_ACCESS_KEY_ID, 
    secretAccessKey: config.SES_AWS_SECRET_ACCESS_KEY,
    region: config.SES_REGION,
    apiVersion: '2010-12-01'
}

const ses = new AWS.SES(sesConfig);

module.exports = {
    sendMail : (mailReceive) => {
        const params = {
            Destination: {
              ToAddresses: [mailReceive], // email người nhận
            },
            Source: config.MAIL_USER, // email dùng để gửi đi
            Message: {
              Subject: {
                Data: 'Test SES AWS',
                Charset: 'UTF-8',
              },
              Body: {
                Text: {
                  Data: 'Test SES AWS',
                  Charset: 'UTF-8'
                }
              },
            },
          };

          const sendPromise = ses.sendEmail(params).promise();

          sendPromise
            .then((data) => {
              console.log(data)
            })
            .catch((error) => {
              console.log(error)
            })
    }

}