const { Image } = require('./index.js');

async function createTables() {
  try {
    await Image.sync();
    console.log('Tables are synced');
  } catch (err) {
    console.log(err);
  }
}

createTables();