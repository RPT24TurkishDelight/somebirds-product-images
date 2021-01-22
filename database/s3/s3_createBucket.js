//***** NOTE: THIS FILE IS NOT BEING USED CURRENTLY *****

let variables = require('./env.js');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: variables.region});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

const createS3Bucket = () => {
  // Create the parameters for calling createBucket
    var bucketParams = {
      Bucket : 'sb-gallery1'
    };
    // call S3 to create the bucket
    s3.createBucket(bucketParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Location);
      }
    });
}

module.exports.createS3Bucket = createS3Bucket;