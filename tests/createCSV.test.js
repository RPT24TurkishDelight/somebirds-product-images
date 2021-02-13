const { createImagesCSV } = require('../database/psql/createCSV.js');
const fs = require('fs').promises;

// Mocking image urls array from cloudinary (doesn't work at the moment)
// const cloudinary = require('../database/cloudinary/getImagesList.js');
// jest.mock('../database/cloudinary/getImagesList.js');

// let urlList = [
//   'https://testimage1.jpg',
//   'https://testimage2.jpg',
//   'https://testimage3.jpg'
// ];

// cloudinary.getImagesList.mockResolvedValue(urlList);

// Delete csv file after test
afterEach(() => {
  fs.unlink('./tests/testCSV.csv', (err) => {
    if (err) throw err;
  });
});

test('csv file created correctly', async () => {

  await createImagesCSV(9, './tests/testCSV.csv', 'utf-8');

  let data  = await fs.readFile('./tests/testCSV.csv', 'utf8');

  let arr = data.split('\n');
  let firstModelId = arr[1][0];
  let lastModelId = arr[arr.length - 2][0];

  let lastUrl = arr[arr.length - 2].split(',')[1]

  expect(firstModelId).toEqual('1');
  expect(lastModelId).toEqual('9');
  // expect(lastUrl).toBeOneOf(urlList);

});