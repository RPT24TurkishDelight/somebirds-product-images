const { Image } = require('../database/psql/index.js');

module.exports = {
    shoeImgs: {
      post: (shoeId, imgUrl) => {
        return Image.create({
          modelId: shoeId,
          imageUrl: imgUrl
        })
      },
      get: (shoeId) => {
        return Image.findAll({
          where: {
            modelId: shoeId
          }
        });
      },
      put: (imgId, imgUrl) => {
        return Image.update({ imageUrl: imgUrl }, {
          where: {
            id: imgId
          }
        });
      },
      delete: (imgId) => {
        return Image.destroy({
          where: {
            id: imgId
          }
        });
      }
    }
}