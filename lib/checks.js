import { check } from 'k6';

export function checkStatus200(res) {
  return check(res, {
    'status is 200': (r) => r.status === 200,
  });
}

export function checkStatus200or201(res) {
  return check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });
}
