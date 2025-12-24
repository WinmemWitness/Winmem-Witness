# Observability

Winmem supports OpenTelemetry for tracing, Prometheus-style metrics, and structured logging.

## Logging

- JSON logs with request IDs
- log levels: error, warn, info, debug
- redact secrets by default

## Metrics

Recommended metrics:
- ingestion lag (slots behind)
- queue depth per queue
- job latency and failures
- RPC error rates and 429 rates
- DB query latency
- proof batch finalization time

## Tracing

- trace inbound API requests
- trace worker jobs and pipeline stages
- include projectId and tenantId as attributes (careful about cardinality)

## Alerting

- sustained RPC failure rates
- growing queue depth
- DB errors and slow queries
- proof mismatch detections
- export failures

## Dashboards

Provide Grafana dashboards:
- system overview
- per-project ingestion
- proof batches
- API performance
