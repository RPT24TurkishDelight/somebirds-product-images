import http from 'k6/http';
export let options = {
  // virtual users
  vus: 1000,
  duration: '1s',
};
export default function () {
  var url = 'http://localhost:3004/products/9500000/gallery';
  var payload = JSON.stringify({
    imgUrl: '#####Stress Testing#####'
  });
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
}
