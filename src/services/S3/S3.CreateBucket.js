const {PutObjectCommand, CreateBucketCommand} = require('@aws-sdk/client-s3');
const s3Client = require('./S3.Config');

module.exports = {
    run : async (file) => {
        const params = {
            Bucket: 'new-bucket-nqd262001',
            Key : 'image' + Date.now(),
            Body : file
        };

        try {
            const data = await s3Client.send(
                new CreateBucketCommand({
                    Bucket : params.Bucket
                })
            );
            console.log(data);
            return data;
        } catch (err) {
            console.log(err)
        };

        try {
            const results = await s3Client.send(
                new PutObjectCommand(params),
            )
            return results;
            
        } catch (err) {
            console.log(err);
        }
    }
}