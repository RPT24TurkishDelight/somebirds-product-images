// Test the getImages function (Unsplash API)
const unsplash = require('unsplash-js');
jest.mock('unsplash-js');

// getImages function (database/unsplash/getImages.js)
// modified to remove api credential requirements.
// mimics photo retrival without the photos.getRandom() method
// for mocking purposes.
const getImages = async () => {
  return unsplash.createApi().then(result => {
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

xtest('Should get images array from unsplash', () => {

  const resp = {
    response: [
      {
        urls: {
          regular: 'https://images.fakeImage1.com'
        }
      },
      {
        urls: {
          regular: 'https://images.fakeImage2.com'
        }
      }
    ]
  }

  const imgArr = ['https://images.fakeImage1.com', 'https://images.fakeImage2.com']

  unsplash.createApi.mockResolvedValue(resp)

  return getImages().then(images => expect(images).toEqual(imgArr));
})

