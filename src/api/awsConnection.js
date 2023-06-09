const AWS = require("aws-sdk");
const uuid = require("uuid");

const s3 = new AWS.S3({
  region: "eu-central-1",
  signatureVersion: "v4",
  accessKeyId: "AKIA5AMCCKP2FU2Z3ALW",
  secretAccessKey: "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",
});

const BUCKET_NAME = "unistaybucket";

const blobToBuffer = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(new Uint8Array(reader.result));
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};

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
    console.log("uploadPhoto called: ", objectParams);
    s3.upload(objectParams, (err, data) => {
      if (err) {
        reject(err);
        console.log("S3 upload successful!");
      } else {
        resolve(data.Key);
        console.log("S3 upload unsuccessful! :(");
      }
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

module.exports = { uploadPhoto, getPhotoUrl, deletePhoto, blobToBuffer };
