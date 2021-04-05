const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

const s3Bucket = process.env.s3Bucket;

const upload = async (event, context, callback) => {
  const objectName = "helloworld2.json";
  const objectData = '{ "message" : "Hello World!" }';
  const objectType = "application/json";

  try {
    const params = {
      Bucket: s3Bucket,
      Key: objectName,
      Body: objectData,
      ContentType: objectType,
    };
    const result = await s3.putObject(params).promise();

    console.log("result:", result);

    return sendRes(
      200,
      `File uploaded successfully at https:/` +
        s3Bucket +
        `.s3.amazonaws.com/` +
        objectName
    );
  } catch (error) {
    return sendRes(404, error);
  }
};

const download = async (event, context, callback) => {
  const objectName = "helloworld2.json";

  try {
    const params = {
      Bucket: s3Bucket,
      Key: objectName,
    };
    const result = await s3.getObject(params).promise();
    const data = JSON.parse(result.Body.toString("utf-8")).message;

    console.log("result:", result);

    return sendRes(200, `Message:/` + data);
  } catch (error) {
    return sendRes(404, error);
  }
};

const remove = async (event, context, callback) => {
  const objectName = "helloworld2.json";

  try {
    const params = {
      Bucket: s3Bucket,
      Key: objectName,
    };
    const result = await s3.deleteObject(params).promise();

    console.log("result:", result);

    return sendRes(
      200,
      `File deleted successfully at https:/` +
        s3Bucket +
        `.s3.amazonaws.com/` +
        objectName
    );
  } catch (error) {
    return sendRes(404, error);
  }
};

exports.handler = remove;

const sendRes = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "OPTIONS,POST,PUT",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "*",
    },
    body: body,
  };

  return response;
};
