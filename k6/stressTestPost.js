import http from 'k6/http';
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // iterations per second, i.e. 1000 RPS
      duration: '60s', // duration the iterations will attempt to run for
      preAllocatedVUs: 1500, // how large the initial pool of VUs would be (match the rps)
      maxVUs: 2500, // if the preAllocatedVUs are not enough, we can initialize more
      gracefulStop: '10m',
    },
  },
};
export default function () {
  var url = 'http://localhost:3004/products/9950003/gallery';
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
