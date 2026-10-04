# k6 Performance Testing

![k6 Tests](https://github.com/ameenvesali-qa/k6-performance-testing/actions/workflows/k6-tests.yml/badge.svg)

Performance tests against the [Restful-Booker](https://restful-booker.herokuapp.com) public demo API, covering the five core load testing patterns.

## Test types

| File | Type | Question it answers | Shape |
|------|------|---------------------|--------|
| `tests/smoke.js` | Smoke | Does it work at all, under minimal load? | Flat, 2 VUs, 10s |
| `tests/load.js` | Load | Does it hold up under expected normal traffic? | Ramp up → hold → ramp down, 10 VUs |
| `tests/stress.js` | Stress | Where does it start to break? | Gradually increasing load (up to 100 VUs) |
| `tests/spike.js` | Spike | Can it handle a sudden surge, and recover? | Sharp jump in VUs, then drop |
| `tests/soak.js` | Soak | Does it degrade over a sustained period? | Moderate load held steady (3 min here; real soaks often run for hours) |

## Design

- **Shared lib:** URL, checks, and booking requests live in `lib/` so each test file mainly defines load shape and thresholds.
- **Request mix:** load (and related helpers) exercise both listing bookings (`GET`) and creating a booking (`POST`), not only a single endpoint.
- **Thresholds:** smoke/load use stricter limits; stress/spike allow more latency/errors because they intentionally push harder.

## Project structure

```
lib/
  config.js      Base URL from __ENV (with default)
  checks.js      Reusable status checks
  booking.js     GET/POST booking helpers
tests/
  smoke.js
  load.js
  stress.js
  spike.js
  soak.js
.github/workflows/
  k6-tests.yml     Smoke on every push/PR
  k6-nightly.yml   Nightly smoke + load; heavier tests on demand
```

## Running the tests

Requires [k6](https://k6.io/docs/get-started/installation/).

```bash
k6 run tests/smoke.js
k6 run tests/load.js
k6 run tests/stress.js
k6 run tests/spike.js
k6 run tests/soak.js
```

Optional base URL override:

```bash
k6 run -e BASE_URL=https://restful-booker.herokuapp.com tests/load.js
```

Note: stress and spike intentionally push past normal traffic and may produce elevated error rates or slower responses against this shared public demo server. That is expected and is what those test types are designed to surface.

## How to read results

k6 prints metrics at the end of each run:

- **http_req_duration (p95)** — 95% of requests finished within this time
- **http_req_failed** — share of failed requests
- **checks** — percentage of status assertions that passed

**Thresholds** are the pass/fail gates. If a threshold is crossed, k6 exits non-zero (CI fails).

## CI

GitHub Actions runs the **smoke** test on every push and pull request to `main`, confirming the API is reachable and responding before heavier work.

A **nightly** workflow runs smoke and load automatically. Stress, spike, and soak are available via `workflow_dispatch` (manual run) so heavy load is not applied to the public demo API on a fixed schedule without intent.

## Tools

k6 · JavaScript · GitHub Actions · Git

