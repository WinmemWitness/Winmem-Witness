# Load tests

This directory contains k6 scripts and scenario configs.

Run k6 locally:
```bash
k6 run test/load/k6/api-smoke.js
```

Or run scenario:
```bash
k6 run -e BASE_URL=http://localhost:8080 test/load/scenarios/read-heavy.js
```
