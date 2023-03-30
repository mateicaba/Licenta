const AWS = require("aws-sdk");
const uuid = require("uuid");

const s3 = new AWS.S3({
  region: "eu-central-1",
  signatureVersion: "v4",
  accessKeyId: "AKIA5AMCCKP2BHOATMTE",
  secretAccessKey: "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",
});

const BUCKET_NAME = "unistay";

function uploadPhoto(file) {
  return new Promise((resolve, reject) => {
    const id = uuid.v4(); // Generate a unique ID for the object key
    const objectParams = {
      Bucket: BUCKET_NAME,
      Key: `${id}.jpg`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "private",
    };
    s3.upload(objectParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Key);
      }//changed the database link only get works
    });
  });
}

function getPhotoUrl(key) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: 3600, // URL will expire in 1 hour (3600 seconds)
  };

  return s3.getSignedUrlPromise("getObject", params);
}


function deletePhoto(key) {
  return s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
}

module.exports = { uploadPhoto, getPhotoUrl, deletePhoto };
