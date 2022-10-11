const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/Config.Env');
const {HandleResponse} = require('../utils/HandleResponse');
const S3Upload = require('../services/S3/S3.CreateBucket');

module.exports = {
    upload : function (req, res, next) {
        try {
            aws.config.update({
                secretAccessKey: config.AWS_SECRET_KEY,
                accessKeyId: config.AWS_ACCESS_KEY,
                region: config.AWS_REGION
            });

            const s3 = new aws.S3();

            const upload = multer({
                storage: multerS3({
                    s3: s3,
                    bucket: config.AWS_BUCKET,
                    key: (req, file, cb) => {
                        console.log(file);
                        cb(null, file.originalname);
                        return res.status(200).json(HandleResponse(200, 'upload successfully', file));
                    }
                })
            }).fields([
                { name: 'file', maxCount: 1 }
            ])

            
        } catch (err) {
            console.log(err);
            return res.status(400).json(HandleResponse(400, err, null));
        }
    },

    uploadV2 : async (req, res, next) => {
        const data = S3Upload.run(req.body.file);
        return res.status(200).json(
            HandleResponse(200, 'ok',data));
    },

    uploadV3 : async (req, res, next) => {
        const s3 = new aws.S3();
        const fileName = req.body.fileName;
        const fileType = req.body.fileType;
        const s3Params = {
            Bucket: config.AWS_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: "public-read"
        };

        console.log(fileName);

        s3.getSignedUrl("putObject", s3Params, (err, data) => {
            if (err) {
                console.log(`getSignedUrl error: `, err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${configAWS.BUCKET}.s3.amazonaws.com/${fileName}`
            };
            res.write(JSON.stringify(returnData));
            res.end();
        });
    }
}