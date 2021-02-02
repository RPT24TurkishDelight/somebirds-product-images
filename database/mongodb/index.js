const mongoose = require('mongoose');

// Open a connection to images database
mongoose.connect('mongodb://localhost/images',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},
() => {
  console.log("Mongoose successfully connected!")
});

// Notification if not connected successfully
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Create schema
const ImageSchema = new mongoose.Schema({
  modelId: Number,
  urls: [{ id: Number, imageUrl: [String] }],
})

// Complie schema into a model
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;