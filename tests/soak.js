import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // ramp to normal load
    { duration: '3m', target: 10 },    // hold steady, much longer than other tests
    { duration: '30s', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://restful-booker.herokuapp.com/booking');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
