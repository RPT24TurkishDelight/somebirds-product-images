const { getImagesList } = require('./cloudinary/getImagesList.js');

// getImagesList().then(res => {
//   console.log(res);
// }). catch(err => {
//   console.log(err);
// })

// const generateImages = async () => {
//   const imgs = await getImagesList();
//   return imgs;
// }
// console.log(generateImages());

getImagesList()
  .then(imgArr => console.log(imgArr, imgArr.length))
  .catch(err => console.log(err))
