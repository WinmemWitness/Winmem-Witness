# Terraform Modules

This directory contains reusable Terraform modules used by the cloud targets.

Modules should be:
- composable
- versioned
- tested via `terraform validate` and `tflint` (optional)

Common modules:
- vpc/network
- postgres (managed)
- redis (managed)
- kubernetes cluster
- object storage (exports)
- secrets manager integration
