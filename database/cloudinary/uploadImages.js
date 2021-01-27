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

const maxImagesToUpload = 1000;

// Gets image list from unsplash and uploads each to cloudinary
const getAndUploadImages = async () => {
  for (var i = 1; i <= maxImagesToUpload; i += 30) {
    var links = await unsplash.getImages();
    for (var j = 0; j < links.length; j++) {
      var link = links[j];
      try {
        await uploadImg(link)
      } catch(err) {
        console.error(`error uploading img to cloudinary ${err}`);
      }
    }
  }
};

getAndUploadImages();