const express = require('express');
const app = express();
const controller = require('../controller/index.js');
const path = require('path');

app.use(express.json())
app.use(express.static('public'));

// Create
app.post('/products/:shoeId/gallery', controller.productImages.post)

// Read
app.get('/products/:shoeId/gallery', controller.productImages.get)

// Update
app.put('/products/:shoeId/gallery', controller.productImages.put)

// Delete
app.delete('/products/:shoeId/gallery', controller.productImages.delete)

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