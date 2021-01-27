const cloudinary = require('cloudinary').v2;
const cloudinaryKeys = require('./cloudinaryKey.js');

cloudinary.config({
  cloud_name: cloudinaryKeys.cloud_name,
  api_key: cloudinaryKeys.api_key,
  api_secret: cloudinaryKeys.api_secret
});

cloudinary.api.resources((err, res) => {
  if (err) {
    console.error(err);
  } else {
    let list = res.resources.map(info => info.secure_url);
    console.log(list);
  }
})
