const fs = require('fs');
const cloudinary = require('../cloudinary/getImagesList.js');
const utils = require('../utils.js');

const createImagesCSV = async (numberOfEntries, fileName, encoding) => {
  console.time('seed');
  // Get image array from Cloudinary API
  let imgs = await cloudinary.getImagesList();

  // Create a writestream
  const imagesWriteStream = fs.createWriteStream(fileName);

  // Write the headers to the file
  imagesWriteStream.write('modelId,imageUrl\n', encoding);

  let modelId = 1;


  // Write (recursive) function
  const write = () => {
    let storageAvail = true;

    while (modelId <= numberOfEntries && storageAvail) {
      // How many images for this shoe? 4-8
      let numberOfImages = utils.randomInt(4, 8)

      while (numberOfImages > 0) {
        let imageUrl = utils.randomImg(imgs);
        let data = `${modelId},${imageUrl}\n`;

        // Is this the last image of the last shoe?
        if (modelId === numberOfEntries && numberOfImages === 1) {
          // Write last piece of data and run callback to end
          imagesWriteStream.write(data, encoding, () => {
            imagesWriteStream.end();
          });
        } else {
          // If max storage reached, this outputs false
          storageAvail = imagesWriteStream.write(data, encoding)
        }

        numberOfImages --;
      }

      modelId ++;
    }

    // If max storage reached and writing stops early
    if (modelId <= numberOfEntries) {
      // Write some more once it drains
      imagesWriteStream.once('drain', write);
    }
  }

  write();
  console.timeEnd('seed');
}

createImagesCSV(1000, './database/psql/test.csv', 'utf-8')