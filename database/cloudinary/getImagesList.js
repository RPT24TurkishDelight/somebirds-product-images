const cloudinary = require('cloudinary').v2;
const cloudinaryKeys = require('./cloudinaryKey.js');

cloudinary.config({
  cloud_name: cloudinaryKeys.cloud_name,
  api_key: cloudinaryKeys.api_key,
  api_secret: cloudinaryKeys.api_secret
});

// How many results per call (Max 500)
const imgUrlsPerCall = 10;

const getImagesList = async () => {
  // Get first set of results
  const firstSet = await cloudinary.api.resources({ max_results: imgUrlsPerCall });
  let nextCursor = firstSet.next_cursor;
  const arrOne = firstSet.resources.map(info => info.secure_url);

  // Get first set of results
  const secondSet = await cloudinary.api.resources({ max_results: imgUrlsPerCall, next_cursor: nextCursor });
  const arrTwo = secondSet.resources.map(info => info.secure_url);

  const imgArr = arrOne.concat(arrTwo);
  return imgArr;
}

module.exports = { getImagesList };