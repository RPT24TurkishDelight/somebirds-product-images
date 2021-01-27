const { createApi } = require('unsplash-js');
const { accessKey } = require ('./unsplashKey.js');
const nodeFetch = require('node-fetch');

const unsplash = createApi({
  accessKey: accessKey,
  fetch: nodeFetch,
});

// How many images to get per request from unsplash (max 30)
const imageCount = 30;

// Gets photos from unsplash API (max 30 at a time)
const getImages = () => {
  return unsplash.photos.getRandom({
    query: 'shoes',
    count: imageCount,
  }).then(result => {
    if (result.errors) {
      console.log('error occurred: ', result.errors[0]);
      return result.errors[0]
    } else {
      const photos = result.response;
      const images = photos.map(photo => photo.urls.regular);
      return images;
    }
  }).catch(err => {
    console.log(`error getting images from unsplash: ${err}`)
  });
}

module.exports = { getImages };