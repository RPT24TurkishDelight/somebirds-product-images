const cloudinary = require('../database/cloudinary/getImagesList.js');
jest.mock('../database/cloudinary/getImagesList.js');

// Note: seedDb function ('../database/seed.js') modified to:
// Only create 3 records
// Images array is just one image
// Each record is just the one image from that array
// Return shoes instead of inserting into a DB
const seedDb = async () => {
  // Get image array
  let imgs = await cloudinary.getImagesList();

  for (var i = 0; i <= 0; i++) {
    let shoes = [];

    for (var j = 1; j <= 3; j++) {
      let shoe = {}
      let modelId = (i * 3) + j;

      // How many images for this shoe? 4-8
      let numberOfImages = 1

      let imageUrls = [];
      // Pick 4-8 random images from images array
      while (numberOfImages > 0) {
        imageUrls.push(imgs[0])
        numberOfImages --;
      }

      shoe.modelId = modelId;
      shoe.imageUrl = imageUrls;

      shoes.push(shoe);
    }

    return shoes;
  }

}



xtest('Should return formatted shoe and images record from input images array', () => {

  const fakeImgArr = [
    'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/idgdyuj36r6t0ckjwvnn.jpg'
  ];

  const expectedResultArr = [
    {
      modelId: 1,
      imageUrl: [
        'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/idgdyuj36r6t0ckjwvnn.jpg'
      ]
    },
    {
      modelId: 2,
      imageUrl: [
        'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/idgdyuj36r6t0ckjwvnn.jpg'
      ]
    },
    {
      modelId: 3,
      imageUrl: [
        'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/idgdyuj36r6t0ckjwvnn.jpg'
      ]
    }
  ]

  cloudinary.getImagesList.mockResolvedValue(fakeImgArr);

  return seedDb().then(shoes => expect(shoes).toEqual(expectedResultArr));
})