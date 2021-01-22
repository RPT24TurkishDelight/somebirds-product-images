const model = require('../model/index.js');

module.exports = {
  post: {
    productImages: async (req, res) => {
      let { shoeId } = req.params;
      console.log('req:', req.body.imgUrl);
      let { imgUrl } = req.body;
      console.log(`shoeid ${shoeId}, imgurl ${imgUrl}`)
      try {
        const imgEntry = await model.post.shoeImgs(shoeId, imgUrl);
        res.status(200).send(imgEntry);
      } catch(err) {
        console.log(`error in model POST ${err}`);
        res.status(400);
      }
    }
  },
  get: {
    productImages: async (req, res) => {
      let { shoeId } = req.params;
      try {
        const images = await model.get.shoeImgs(shoeId);
        const urls = images.map(image => image.dataValues.imageUrl);
        res.status(200).send(urls);
      } catch(err) {
        console.log(`error in model GET ${err}`);
        res.status(400);
      }
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