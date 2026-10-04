import { sleep } from 'k6';
import { getBookings, createBooking, sampleBooking } from '../lib/booking.js';
import { checkStatus200, checkStatus200or201 } from '../lib/checks.js';

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
  const list = getBookings();
  checkStatus200(list);

  const created = createBooking(sampleBooking());
  checkStatus200or201(created);

  sleep(1);
}
