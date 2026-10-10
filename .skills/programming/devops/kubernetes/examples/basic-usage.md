# Kubernetes Best Practices: Basic Usage

Best practices for using Kubernetes for container orchestration. Use when creating, structuring, or reviewing Kubernetes configurations — covers pod management, deployments, services, configuration, and cluster operations.

## Scenario

Use this example as a starting point when applying **kubernetes-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Pod Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    tier: frontend
spec:
  containers:
  - name: myapp
    image: myapp:1.2.3
    ports:
    - containerPort: 3000
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    livenessProbe:
      httpGet:
        path: /health
        port: 3000
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 3000
      initialDelaySeconds: 5
      periodSeconds: 5
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
