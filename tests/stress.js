import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../lib/config.js';
import { checkStatus200 } from '../lib/checks.js';

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
  const res = http.get(`${BASE_URL}/booking`);
  checkStatus200(res);
  sleep(1);
}
