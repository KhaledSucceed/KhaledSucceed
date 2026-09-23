# Validation Record

**Date:** 23 September 2026  
**Environment:** Windows local PC  
**Node:** v24.16.0

## Dependency security
`npm audit` result: **0 vulnerabilities**

## Automated tests
Command:
`npm.cmd test`

Result:
- 3 test files passed
- 24 tests passed
- **24 / 24 PASS**

Test suites:
- `spellChecker.test.js` — 8 tests
- `algorithms.test.js` — 8 tests
- `courseMatrix.test.js` — 8 tests

## Production build
Command:
`npm.cmd run build`

Result: **PASS**

Build metrics:
- generated imported dictionary: 274,937 words
- dictionary split into per-letter lazy-loaded JSON buckets
- main production JS: 226.42 kB
- main JS gzip: 71.02 kB

## Preview smoke test
The production preview server responded with HTTP 200 on `127.0.0.1:4173`.

No claim of visual screenshot verification is made because the local Edge headless environment did not emit a screenshot artifact.