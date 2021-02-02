const { Sequelize, DataTypes } = require('sequelize');

// Connect to database
const sequelize = new Sequelize('imagegallery', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
  console.error('Unable to connect to the database:', error);
  });

// Define Model
const Image = sequelize.define('Image', {
  modelId: {
    type: DataTypes.INTEGER,
  },
  imageUrl: {
    type: DataTypes.STRING
  }
}, {
  // Not necessary but explicityly defines table name
  tableName: 'Images',
  timestamps: false
});

// Creates the table, dropping it first if it already existed
Image.sync({ force: true })
  .then(() => {
    console.log('The table for the Image model was just (re)created!');
  })
  .catch(error => console.error(`Error syncing images table. ${error}`))

module.exports = {
  Image
};