const { Image } = require('../database/index.js');

module.exports = {
  post: {
    shoeImgs: () => {

    }
  },
  get: {
    shoeImgs: async (shoeId) => {
        return Image.findAll({
          where: {
            modelId: shoeId
          }
        });
    }
  },
  put: {
    shoeImgs: () => {

    }
  },
  delete: {
    shoeImgs: () => {

    }
  }
}

// var getShoeImages = (shoeId) => {
//   return Image.findAll({
//     where: {
//       modelId: shoeId
//     }
//   });
// };

// module.exports = {
//   getShoeImages
// };