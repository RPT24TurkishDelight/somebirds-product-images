// Helper functions for database seeding
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomImg = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = { randomImg, randomInt };
