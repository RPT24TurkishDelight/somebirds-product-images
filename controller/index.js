const model = require('../model/index.js');

module.exports = {
  productImages: {
    post: async (req, res) => {
      let { shoeId } = req.params;
      let { imgUrl } = req.body;
      try {
        const postResponse = await model.shoeImgs.post(shoeId, imgUrl);
        res.status(200).send(postResponse);
      } catch(err) {
        console.log(`error in adding entry to DB ${err}`);
        res.sendStatus(400);
      }
    },
    get: async (req, res) => {
      let { shoeId } = req.params;
      try {
        const images = await model.shoeImgs.get(shoeId);
        const urls = images.map(image => image.dataValues.imageUrl);
        res.status(200).send(urls);
      } catch(err) {
        console.log(`error in reading entry from DB ${err}`);
        res.sendStatus(400);
      }
    },
    put: async (req, res) => {
      let { shoeId } = req.params;
      let { imgUrl, imgId } = req.body;
      try {
        await model.shoeImgs.put(imgId, imgUrl);
        res.sendStatus(200);
      } catch(err) {
        console.log(`error in updating entry in DB ${err}`);
        res.sendStatus(400);
      }
    },
    delete: async (req, res) => {
      let { shoeId } = req.params;
      let { imgId } = req.body;
      try {
        await model.shoeImgs.delete(imgId);
        res.sendStatus(200);
      } catch(err) {
        console.log(`error in deleting entry in DB ${err}`);
        res.sendStatus(400);
      }
    }
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