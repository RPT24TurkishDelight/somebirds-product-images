const cloudinary = require('cloudinary').v2;
const cloudinaryKeys = require('./cloudinaryKey.js');
const unsplash = require('../unsplash/getImages.js');

cloudinary.config({
  cloud_name: cloudinaryKeys.cloud_name,
  api_key: cloudinaryKeys.api_key,
  api_secret: cloudinaryKeys.api_secret
});

// Uploads one image to coludinary
const uploadImg = (link) => {
  cloudinary.uploader.upload(link, { tags: "basic_sample" }, (err, image) => {
    if (err) { console.warn(err); }
  });
}

// Gets image list from unsplash and uploads each to cloudinary
const getAndUploadImages = async () => {
  const links = await unsplash.getImages();
  for (var i = 0; i < links.length; i++) {
    let link = links[i];
    try {
      await uploadImg(link)
    } catch(err) {
      console.log(`error uploading img to cloudinary ${err}`);
    }
  }
}

getAndUploadImages();

module.exports = { uploadImages };