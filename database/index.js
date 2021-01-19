const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize( 'sbGallery', 'root', '', {
  // host: 'localhost',
  // host: '54.153.5.233',
  port: 3306,
  dialect: 'mysql'
});


sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});

// var testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// testConnection();

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  modelId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
  /* ,
  locationIndex: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  */
}, { timestamp: false });

module.exports = {
  Image
 };