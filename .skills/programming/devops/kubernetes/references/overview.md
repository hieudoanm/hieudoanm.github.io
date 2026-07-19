# Overview

Focused reference for **kubernetes-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Kubernetes Best Practices

Kubernetes is a container orchestration platform for automating deployment, scaling, and management of containerized applications. Best practice is to follow Kubernetes conventions, implement proper resource management, use configuration effectively, and follow security best practices.

---

## 1. Core Concepts

- **Pods** — smallest deployable units in Kubernetes
- **Deployments** — manage pods and provide self-healing
- **Services** — provide network access to pods
- **ConfigMaps and Secrets** — manage configuration and sensitive data
- **Namespaces** — organize resources logically

---

## 2. Pod Configuration

- **Pod specification** — define pods properly:

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

- **Resource requests and limits** — set resource constraints:

```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
```

- **Probes** — implement health and readiness probes:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3
```

---

## 3. Deployment Configuration

- **Deployment specification** — define deployments properly:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: myapp
        version: v1
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
```

- **Update strategy** — configure update strategies:

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1          # Maximum number of pods that can be created above desired replicas
    maxUnavailable: 0    # Maximum number of pods that can be unavailable during update
```

- **Replica management** — manage replicas appropriately:

```yaml
spec:
  replicas: 3  # Production: 3+ for high availability
  # Development: 1-2 replicas
```

---


## 4. Service Configuration

A Service selects pods by labels and exposes their ports. Choose scope deliberately:

| Type | Reachability | Typical use |
|---|---|---|
| `ClusterIP` | Inside the cluster | Default service-to-service access |
| `NodePort` | Through a node address and port | Limited external access or a local cluster |
| `LoadBalancer` | Through a provider-managed load balancer | Public or private external entry point |

Keep `selector` labels aligned with pod-template labels and map the service port to the container's actual target port. Prefer an Ingress or Gateway for HTTP routing rather than exposing every application with a separate node port.
