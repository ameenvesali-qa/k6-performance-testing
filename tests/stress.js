import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // beyond normal load
    { duration: '1m', target: 50 },    // push harder
    { duration: '30s', target: 100 },  // push to breaking point
    { duration: '30s', target: 0 },    // recover
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  const res = http.get('https://restful-booker.herokuapp.com/booking');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
