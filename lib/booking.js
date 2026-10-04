import http from 'k6/http';
import { BASE_URL } from './config.js';

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export function getBookings() {
  return http.get(`${BASE_URL}/booking`);
}

export function createBooking(payload) {
  return http.post(`${BASE_URL}/booking`, JSON.stringify(payload), {
    headers: jsonHeaders,
  });
}

export function sampleBooking() {
  return {
    firstname: 'Ameen',
    lastname: 'Test',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-10-01',
      checkout: '2026-10-05',
    },
    additionalneeds: 'Breakfast',
  };
}
