const AWS = require('aws-sdk');
const config = require('../../config/Config.Env');

AWS.config.update({
    accessKeyId : config.AWS_ACCESS_KEY,
    secretAccessKey : config.AWS_SECRET_KEY,
    region : config.AWS_REGION
});

const s3 = new AWS.S3();

const params = {
    Bucket : config.AWS_BUCKET
}

const editBucketCORS = () => 
    s3.putBucketCors({
        Bucket : config.AWS_BUCKET,
        CORSConfiguration : {
            CORSRules : [
                {
                    AllowedHeaders : ["*"],
                    AllowedMethods : ["PUT", "POST", "DELETE"],
                    AllowedOrigins : ["*"]
                },
                {
                    AllowedMethods : ["GET"],
                    AllowedOrigins : ["*"]
                }
            ]
        },
    }, err => {
        if (err) console.log(err, err.stack);
        else console.log('Edit Bucket CORS succeed!');
    });

s3.createBucket(params, (err, data) => {
    if(err) console.log(err, err.stack);
    else {
        console.log(data);
        editBucketCORS();
    }
})