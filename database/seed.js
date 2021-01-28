const utils = require('./utils.js')

// load image from whatever DB (Mongo or Maria)
//const { Image } = require('./mySql/index.js');

// load function to get list of images from cloudinary
const cloudinary = require('./cloudinary/getImagesList.js');


const seedDb = async () => {
  // Get image array
  let imgs = await cloudinary.getImagesList();

  // 10000 loops of 1000 shoes for 10MM
  for (var i = 0; i <= 9999; i++) {
    let shoes = [];
    // create a set of 1000 shoe records
    for (var j = 1; j <= 1000; j++) {
      let shoe = {}
      let modelId = (i * 1000) + j;

      // How many images for this shoe? 4-8
      let numberOfImages = utils.randomInt(4, 8)

      let imageUrls = [];
      // Pick 4-8 random images from images array
      while (numberOfImages > 0) {
        imageUrls.push(utils.randomImg(imgs))
        numberOfImages --;
      }

      shoe.modelId = modelId;
      shoe.imageUrl = imageUrls;

      shoes.push(shoe);
    }
    // bulk insert shoes into the db
    console.log(shoes);
    // reset shoes to null
    shoes = null;
  }

}

seedDb();

module.exports = { seedDb };

/*
Example array of objects for MongoDB + Mongoose
[
  { modelId: 1, imageUrl: ['url1', 'url2', 'url3']},
  { modelId: 2, imageUrl: ['url1', 'url2', 'url3', 'url4']},
  { modelId: 3, imageUrl: ['url1', 'url2']}
]

MariaDB + Sequelize bulk create:

User.bulkCreate([
  { username: 'barfooz', isAdmin: true },
  { username: 'foo', isAdmin: true },
  { username: 'bar', isAdmin: false }
]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
  return User.findAll();
}).then(users => {
  console.log(users) // ... in order to get the array of user objects
})
*/










// const list = require('./s3/s3_listObj.js');

// const dummyData = async () => {
//   //keys is an array of the fileNames stored on S3
//   let keys = await list.listAllImages();

//   for (let i = 1; i <= 100; i++) {
//     randomIndex = Math.floor(Math.random() * Math.floor(keys.length));
//     let filename = keys[randomIndex];
//     let url = `https://sb-gallery1.s3-us-west-1.amazonaws.com/${filename}`;

//     try {
//       await Image.bulkCreate([
//         {modelId: i, imageUrl: url},
//         {modelId: i, imageUrl: url},
//         {modelId: i, imageUrl: url},
//         {modelId: i, imageUrl: url},
//         {modelId: i, imageUrl: url},
//         {modelId: i, imageUrl: url}
//       ]);
//     } catch (err) {
//       console.log("Error seeding dummy data image records.")
//       console.error(err);
//       //break the for loop --> not sure if necessary yet
//       return;
//     }
//   }
// };

// const seedDB = async () => {
//   try {
//     // await modelData(); // commented out because this was only used for Gabe's presentation
//     await dummyData();
//   } catch (err) {
//     console.log('Failed to seed data');
//     console.error(err);
//   }
// };

// seedDb();

/*
// commented out because this was only used for Gabe's presentation

const modelData = async () => {
  try {
    const firstModel = await Image.bulkCreate([
      {modelId: 1, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/TD1.jpeg'},
      {modelId: 1, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/TD3.jpeg'},
      {modelId: 1, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/TD2.jpeg'},
      {modelId: 1, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/TD2flip.jpeg'},
      {modelId: 1, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/TD5.jpeg'},
      {modelId: 1, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/TD5flip.jpeg'},
      {modelId: 1, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/TD6.jpeg'},
      {modelId: 1, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/TD8.jpg'}
    ]);
    const secondModel = await Image.bulkCreate([
      {modelId: 2, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/WR1.jpeg'},
      {modelId: 2, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/WR2.jpeg'},
      {modelId: 2, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/WR3.jpeg'},
      {modelId: 2, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/WR4.png'},
      {modelId: 2, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/WR5.jpeg'},
      {modelId: 2, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/WR5flip.jpeg'},
      {modelId: 2, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/WR6.png'},
      {modelId: 2, imageUrl: 'https://sb-gallery.s3-us-west-1.amazonaws.com/WR7.jpeg'},
    ]);
  } catch (err) {
    console.log('Unable to seed demo model data');
    console.error(err);
  }
};
*/

// const testImages = [
//   'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/idgdyuj36r6t0ckjwvnn.jpg',
//   'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/e2vqah3ede3dvn3cqs43.jpg',
//   'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/wrbjgqhfcwlrsz1nuvqd.jpg',
//   'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/hpz8otrhrvpwqd4fbhxq.jpg',
//   'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/lujvp6tqysgsyc6qzlxe.jpg',
//   'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/js4josuggol02oib5vtt.jpg',
//   'https://res.cloudinary.com/some-birds-images/image/upload/v1611641849/rhvqav7of0sxu93sqyfr.jpg',
// ];

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomImg = (arr) => arr[Math.floor(Math.random() * arr.length)];