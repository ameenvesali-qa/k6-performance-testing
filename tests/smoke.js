import http from 'k6/http';
import { sleep } from 'k6';
import { BASE_URL } from '../lib/config.js';
import { checkStatus200 } from '../lib/checks.js';

export const options = {
  vus: 2,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/booking`);
  checkStatus200(res);
  sleep(1);
}
