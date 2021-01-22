const { Image } = require('../database/index.js');

module.exports = {
  post: {
    shoeImgs: (shoeId, imgUrl) => {
      return Image.create({
        modelId: shoeId,
        imageUrl: imgUrl
      })
    }
  },
  get: {
    shoeImgs: (shoeId) => {
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