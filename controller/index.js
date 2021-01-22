const model = require('../model/index.js');

module.exports = {
  post: {
    produtImages: (shoeId, imgUrl) => {
      model.post.shoeImgs()
    }

  },
  get: {
    productImages: async (req, res) => {
      let { shoeId } = req.params;
      try {
        const images = await model.get.shoeImgs(shoeId);
      } catch(err) {
        console.log('error in model:', err);
        res.status(404);
      }
      const urls = images.map(image => image.dataValues.imageUrl);
      res.status(200).send(urls);
    }
  },
  put: {

  },
  delete: {

  }
};


/*
  get: {
    productImages: (shoeID) => {
      return new Promise((resolve, reject) => {
        model.get.shoeImgs(shoeID)
          .then((images) => {
            let urls = images.map((image) => {
              return image.dataValues.imageUrl;
            });
            resolve(urls);
          })
          .catch((err) => {
            reject(err);
          });
        });
    }
  },
*/