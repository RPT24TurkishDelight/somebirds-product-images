const variables = require('./env.js');
const photos = require('../unsplash/getImages.js');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: variables.region});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: variables.bucketName, Key: '', Body: ''};


// getImages from unsplash in an array of links
// iterate through the links
  // download one at a time and write to a location in the repo
  // once one photo is downloaded, create a filestream
  // upload filestream to S3
  // once upload is copmlete, delete that file from computer

var file = process.argv[3];
// var file = 'https://images.unsplash.com/photo-1611080027047-33ea982bef84?ixid=MXwyMDEwNTV8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1';

// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});

// Testing to see if unsplash upload works
uploadParams.Body = fileStream;
// uploadParams.Body = 'https://unsplash.com/photos/lEvE5asVsKs/download';
var path = require('path');
uploadParams.Key = path.basename(file);
// uploadParams.Key = 'testImageSunit3';

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});

// node s3_upload.js BUCKET_NAME FILE_NAME