const fs = require('fs');

// Create a stream named the csv file
const writeImages = fs.createWriteStream('images.csv');

// Write the headers to the file
writeImages.write('modelId,urls', 'utf8');

const createImagesCSV = (writer, encoding, callback) => {
  let i = 20;
  let modelId = 0;

  const write = () => {
    let ok = true;

    do {
      i --;
      modelId ++;
      const urls = ['fakeurl.com', 'fakeurl.com'];
      const data = `${modelId},${urls}`

      // Are we done?
      if (i === 0) {
        // Write last piece of data and run callback to end
        writer.write(data, encoding, callback)
      } else {
        // If max storage reached, this outputs false
        ok = writer.write(data, encoding)
      }
    } while (i > 0 && ok);

    // Had to stop early
    if (i > 0) {
      // Write some more once it drains
      writer.once('drain', write);
    }
  }

  write();
}

createImagesCSV(writeImages, 'utf-8', () => {
  writeImages.end();
})