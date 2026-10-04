// lib/checks.js
import { check } from 'k6';

export function checkStatus200(res) {
  return check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
