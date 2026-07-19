# Review checklist

Focused reference for **kubernetes-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 13. Best Practices

- **Imperative vs Declarative** — prefer declarative configuration:

```bash
# Imperative (avoid in production)
kubectl run myapp --image=myapp:1.2.3

# Declarative (preferred)
kubectl apply -f myapp-deployment.yaml
```

- **Label selectors** — use consistent labels:

```yaml
metadata:
  labels:
    app: myapp
    tier: frontend
    environment: production
```

- **Resource management** — set appropriate resource limits:

```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
```

- **Image references** — pin a released version at minimum; prefer an immutable digest in production:

```yaml
# Good - versioned tag (digest pinning is stronger)
image: myapp:1.2.3

# Avoid - mutable tag
image: myapp:latest
```

---

## 14. Common Patterns

- **Init containers** — use init containers for setup:

```yaml
spec:
  initContainers:
  - name: init-db
    image: busybox
    command: ['sh', '-c', 'until nslookup db; do echo waiting for db; sleep 2; done']
  containers:
  - name: myapp
    image: myapp:1.2.3
```

- **Sidecar containers** — use sidecar containers:

```yaml
spec:
  containers:
  - name: myapp
    image: myapp:1.2.3
  - name: log-agent
    image: log-agent:1.0.0
    volumeMounts:
    - name: logs
      mountPath: /var/log
  volumes:
  - name: logs
    emptyDir: {}
```

- **ConfigMap as files** — mount ConfigMaps as files:

```yaml
volumes:
- name: config-volume
  configMap:
    name: myapp-config
volumeMounts:
- name: config-volume
  mountPath: /etc/config
```

---

## 6. Namespace Organization

Separate environments with namespaces and set quotas to keep a team or workload from exhausting shared capacity:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-resources
  namespace: production
spec:
  hard: {requests.cpu: "4", requests.memory: 8Gi, limits.cpu: "8", limits.memory: 16Gi}
```

Apply namespace metadata consistently to workloads and policies; choose quota values for the actual cluster and team.

## 8. Autoscaling

An HPA requires resource requests on its target containers and a working metrics pipeline. Set bounds based on cluster capacity and test scaling behavior under representative load:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp
spec:
  scaleTargetRef: {apiVersion: apps/v1, kind: Deployment, name: myapp}
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target: {type: Utilization, averageUtilization: 70}
```

---

---

## Quick-Start Checklist

- [ ] Appropriate Kubernetes API versions
- [ ] Resource requests and limits configured
- [ ] Liveness and readiness probes implemented
- [ ] Security contexts configured
- [ ] RBAC implemented
- [ ] Network policies configured
- [ ] ConfigMaps and Secrets used
- [ ] Services configured properly
- [ ] Ingress configured for external access
- [ ] HPA configured for autoscaling
