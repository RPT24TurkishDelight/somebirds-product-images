// require('newrelic');
const app = require('./index.js')
const port = 3004;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
