import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },    // normal traffic
    { duration: '5s', target: 80 },    // sudden spike
    { duration: '15s', target: 80 },   // hold the spike
    { duration: '5s', target: 5 },     // sudden drop
    { duration: '10s', target: 5 },    // recovery check
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
  },
};

export default function () {
  const res = http.get('https://restful-booker.herokuapp.com/booking');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
