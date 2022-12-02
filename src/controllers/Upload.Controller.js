const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/Config.Env');
const {HandleResponse} = require('../utils/HandleResponse');
const S3Upload = require('../services/S3/S3.CreateBucket');

module.exports = {

    uploadStorage :(req, res, next) => {

        try{
            return res.status(200).json({
                status : "200",
                message : "upload image successfully",
                data : {
                    file_path : config.DOMAIN_APP + `/${req.file.filename}`       
                }
            })
        } catch (err) {
            return res.status(400).json(HandleResponse(400, error, null));
        }
    }
}