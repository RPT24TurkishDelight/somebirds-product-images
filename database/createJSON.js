const fs = require('fs');
const cloudinary = require('./cloudinary/getImagesList.js');
const utils = require('./utils.js')

const dataGenJSON = async (numberOfEntries, fileName) => {
  // console.time('createJSON');

  if (typeof numberOfEntries !== 'number' || typeof fileName !== 'string') {
    return 'Please enter arguments as number and string ending in .json';
  }

  // Get image array from Cloudinary API
  let imgs = await cloudinary.getImagesList();

  var shoeImageStream = fs.createWriteStream(fileName);

  let modelId = 1;
  let imageId = 1;

  while(modelId <= numberOfEntries) {
    let shoe = {};
    shoe.modelId = modelId;
    modelId ++;

    // How many images for this shoe? 4-8
    let numberOfImages = utils.randomInt(4, 8)

    let images = [];
    // Pick 4-8 random images from images array
    while (numberOfImages > 0) {
      let url = {};
      url.id = imageId;
      imageId ++;
      url.imageUrl = utils.randomImg(imgs);
      images.push(url);
      numberOfImages --;
    }
    shoe.images = images;

    shoeImageStream.write(JSON.stringify(shoe) + "\n");
  }
  shoeImageStream.end();

  // console.timeEnd('createJSON');
}

dataGenJSON(10000, 'test.json');
