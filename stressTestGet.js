import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  // virtual users
  vus: 10000,
  duration: '1s',
};
export default function () {
  http.get('http://localhost:3004/products/9500000/gallery');
  sleep(1);
}