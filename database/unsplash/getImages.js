const { createApi } = require('unsplash-js');
const { accessKey } = require ('./unsplashKey.js');
const nodeFetch = require('node-fetch');

const unsplash = createApi({
  accessKey: accessKey,
  fetch: nodeFetch,
});

Gets photos from unsplash API (max 30 at a time)
const getThirtyImages = () => {
  return unsplash.photos.getRandom({
    query: 'shoes',
    count: 30,
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

module.exports = { getThirtyImages };