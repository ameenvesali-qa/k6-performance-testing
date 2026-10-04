import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../lib/config.js';
import { checkStatus200 } from '../lib/checks.js';

export const options = {
  stages: [
    { duration: '10s', target: 10 },  // ramp up to 10 VUs
    { duration: '30s', target: 10 },  // stay at 10 VUs
    { duration: '10s', target: 0 },   // ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/booking`);
  checkStatus200(res);
  sleep(1);
}
