//CRUD API Unit Integration Tests

// We will use supertest to test HTTP requests/responses
const request = require('supertest');
const app = require('../server/index.js');

describe('Test CRUD API calls', () => {
  test('It should create new image using POST method', async () => {
    const newImage = await request(app)
      .post('/products/1/gallery')
      .send({
        imgUrl: 'www.TESTPOSTURL.com'
      });
    expect(newImage.body.imageUrl).toBe('www.TESTPOSTURL.com');
    expect(newImage.statusCode).toBe(200);
  });

  test('It should get images using GET method', async () => {
    const response = await request(app).get('/products/1/gallery');
    expect(response.statusCode).toBe(200);
  });

  test('It should update images using PUT method', async () => {
    const response = await request(app)
      .put('/products/1/gallery')
      .send({
        imgId: 8,
        imgUrl: 'www.TESTUPDATEURL.com'
      });
    expect(response.statusCode).toBe(200);
  });

  test('It should delete an image using DELETE method', async () => {
    const response = await request(app)
      .delete('/products/1/gallery')
      .send({
        imgId: 8
      })
  });
})

// Avoid jest open handle error
afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 1000));
});