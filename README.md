# k6 Performance Testing

![k6 Tests](https://github.com/ameenvesali-qa/k6-performance-testing/actions/workflows/k6-tests.yml/badge.svg)

Performance tests against the [Restful-Booker](https://restful-booker.herokuapp.com) public demo API, covering the five core load testing patterns.

## Test types

| File | Type | Question it answers | Shape |
|---|---|---|---|
| `tests/smoke.js` | Smoke | Does it work at all, under minimal load? | Flat, 2 VUs, 10s |
| `tests/load.js` | Load | Does it hold up under expected normal traffic? | Ramp up → hold → ramp down, 10 VUs |
| `tests/stress.js` | Stress | Where does it start to break? | Gradually increasing load well beyond normal (up to 100 VUs) |
| `tests/spike.js` | Spike | Can it handle a sudden surge, and recover? | Sharp, sudden jump in VUs, then sharp drop |
| `tests/soak.js` | Soak | Does it degrade over a sustained period? | Moderate load held steady for an extended duration (shortened here to 3 min for demonstration; real soak tests run for hours) |

## Running the tests

Requires [k6](https://k6.io/docs/get-started/installation/).

k6 run tests/smoke.js
k6 run tests/load.js
k6 run tests/stress.js
k6 run tests/spike.js
k6 run tests/soak.js


Note: stress and spike tests intentionally push well past normal traffic and may produce elevated error rates or slower responses against this shared public demo server, that's expected and is what these test types are designed to surface, not a failure of the test itself.

## CI

GitHub Actions runs the smoke test on every push and pull request to `main`, confirming the API is reachable and responding correctly before anything else runs. The other test types are run manually, since they take longer and apply heavier load than is appropriate for routine CI runs against a shared public server.

## Tools

k6, JavaScript, GitHub Actions, Git and GitHub

## Nightly Workflow 

A nightly workflow runs smoke and load checks automatically. Stress, spike, and soak are run manually (via workflow_dispatch) rather than scheduled, since they apply heavy load to a shared public demo server and don't need to run unattended every night.
