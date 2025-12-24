# AWS Terraform

This folder holds AWS-specific infrastructure for Winmem.

Recommended approach:
- EKS for Kubernetes
- RDS (Postgres) for database
- ElastiCache (Redis)
- S3 for exports and archives
- ACM + ALB Ingress Controller for TLS
- CloudWatch for baseline logging (optional)
