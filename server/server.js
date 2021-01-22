const express = require('express');
const app = express();
const controller = require('../controller/index.js');
const path = require('path');
const port = 3004;

app.use(express.json())
app.use(express.static('public'));

// Create
app.post('/products/:shoeId/gallery', controller.post.productImages)

// Read
app.get('/products/:shoeId/gallery', controller.get.productImages)

// Update
// app.put('products/:shoeId/gallery', controller.put.productImages)

// Delete
// app.delete('products/:shoeId/gallery', controller.delete.productImages)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// WHY IS THIS BEING EXPORTED?
module.exports = app;


// Read
// app.get('/products/:shoeId/gallery', (req, res) => {
//   let { shoeId } = req.params;
//   controller.get.productImages(shoeId)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(404);
//     });
// });