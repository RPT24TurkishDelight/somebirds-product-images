// Get photos from unsplash API
const { createApi } = require('unsplash-js');
const { accessKey } = require ('./unsplashKey.js');
const nodeFetch = require('node-fetch');

const unsplash = createApi({
  accessKey: accessKey,
  fetch: nodeFetch,
});

unsplash.photos.getRandom({
  query: 'shoes',
  count: 10,
}).then(result => {
  if (result.errors) {
    console.log('error occurred: ', result.errors[0]);
  } else {
    const photos = result.response;
    const links = photos.map(photo => {
      return photo.links.self;
    })
    console.log('links:', links);

  }
})