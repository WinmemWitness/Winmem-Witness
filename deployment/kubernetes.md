# Kubernetes Deployment

Winmem supports Kubernetes via raw manifests and Kustomize overlays.

## Directory
infra/k8s/base contains base manifests.
infra/k8s/overlays contains environment-specific patches.

## Deploy

```bash
kubectl apply -k infra/k8s/overlays/prod
```

## Features
- Horizontal Pod Autoscaling
- ConfigMaps and Secrets
- Ingress support
