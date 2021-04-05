const AWS = require('aws-sdk');

const BUCKET_NAME = process.env.s3Bucket;
const IAM_USER_KEY = process.env.accessKeyId;
const IAM_USER_SECRET = process.env.secretAccessKey;

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
});

function uploadObjectToS3Bucket(objectName, objectData) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: objectName,
    Body: objectData,
  };
  s3bucket.upload(params, function (err, data) {
    if (err) throw err;
    console.log(`File uploaded successfully at ${data.Location}`);
  });
}
uploadObjectToS3Bucket('helloworld.json', 'Hello World!');

// OLD

// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

// const upload = async () => {
//   const params = {
//     ACL: 'public-read',
//     Body: 'hello world',
//     ContentType: 'text/html',
//     Bucket: 'nameofbucket'
//   };
// };

// const main = async (event) => {
//   console.log('event:', event);

//   return 'test';
// };

// exports.handler = main;
