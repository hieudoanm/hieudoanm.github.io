---
name: kubernetes-best-practices
description: Best practices for using Kubernetes for container orchestration. Use when creating, structuring, or reviewing Kubernetes configurations — covers pod management, deployments, services, configuration, and cluster operations.
---

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
    image: myapp:latest
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
        image: myapp:latest
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

- **Service types** — choose appropriate service types:

```yaml
# ClusterIP - Internal cluster access
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: ClusterIP
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000

# NodePort - External access via node port
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 30080

# LoadBalancer - External load balancer
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: LoadBalancer
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
```

- **Service discovery** — use service discovery:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
```

---

## 5. Configuration Management

- **ConfigMaps** — use ConfigMaps for configuration:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  NODE_ENV: "production"
  PORT: "3000"
  LOG_LEVEL: "info"
---
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
  - name: myapp
    image: myapp:latest
    envFrom:
    - configMapRef:
        name: myapp-config
```

- **Secrets** — use Secrets for sensitive data:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
data:
  DATABASE_PASSWORD: cGFzc3dvcmQ=  # base64 encoded
---
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
  - name: myapp
    image: myapp:latest
    env:
    - name: DATABASE_PASSWORD
      valueFrom:
        secretKeyRef:
          name: myapp-secret
          key: DATABASE_PASSWORD
```

- **Environment variables** — use environment variables:

```yaml
env:
- name: NODE_ENV
  value: "production"
- name: PORT
  valueFrom:
    configMapKeyRef:
      name: myapp-config
      key: PORT
```

---

## 6. Namespace Organization

- **Namespace configuration** — organize resources with namespaces:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
---
apiVersion: v1
kind: Namespace
metadata:
  name: staging
---
apiVersion: v1
kind: Namespace
metadata:
  name: development
```

- **Resource quotas** — set resource quotas per namespace:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-resources
  namespace: production
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
```

---

## 7. Ingress Configuration

- **Ingress specification** — configure ingress for external access:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
```

---

## 8. Autoscaling

- **Horizontal Pod Autoscaler** — configure HPA:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

## 9. Storage

- **PersistentVolume** — configure persistent storage:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: myapp-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  hostPath:
    path: /mnt/data
```

- **PersistentVolumeClaim** — claim persistent storage:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myapp-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
```

- **Volume mounting** — mount volumes in pods:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
  - name: myapp
    image: myapp:latest
    volumeMounts:
    - name: data-volume
      mountPath: /data
  volumes:
  - name: data-volume
    persistentVolumeClaim:
      claimName: myapp-pvc
```

---

## 10. Security Best Practices

- **Security contexts** — configure security contexts:

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000
  capabilities:
    drop:
    - ALL
```

- **Network policies** — implement network policies:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: myapp-network-policy
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
```

- **RBAC** — implement role-based access control:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: myapp-service-account
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: myapp-role
rules:
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: myapp-role-binding
subjects:
- kind: ServiceAccount
  name: myapp-service-account
roleRef:
  kind: Role
  name: myapp-role
```

---

## 11. Monitoring and Logging

- **Prometheus integration** — configure Prometheus monitoring:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "3000"
    prometheus.io/path: "/metrics"
spec:
  selector:
    app: myapp
  ports:
  - port: 3000
```

- **Logging configuration** — configure logging:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
  - name: myapp
    image: myapp:latest
    env:
    - name: LOG_LEVEL
      value: "info"
    - name: LOG_FORMAT
      value: "json"
```

---

## 12. Complete Examples

- **Complete application deployment** — full application stack:

```yaml
# Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: production
---
# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
  namespace: production
data:
  NODE_ENV: "production"
  PORT: "3000"
---
# Secret
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
  namespace: production
type: Opaque
data:
  DATABASE_PASSWORD: cGFzc3dvcmQ=
---
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  namespace: production
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
    spec:
      serviceAccountName: myapp-service-account
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: myapp-config
        env:
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: myapp-secret
              key: DATABASE_PASSWORD
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
---
# Service
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
---
# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
---
# Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
```

---

## 13. Best Practices

- **Imperative vs Declarative** — prefer declarative configuration:

```bash
# Imperative (avoid in production)
kubectl run myapp --image=myapp:latest

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

- **Image tags** — use specific image tags:

```yaml
# Good - Specific tag
image: myapp:v1.2.3

# Avoid - Latest tag
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
    image: myapp:latest
```

- **Sidecar containers** — use sidecar containers:

```yaml
spec:
  containers:
  - name: myapp
    image: myapp:latest
  - name: log-agent
    image: log-agent:latest
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

## 15. General Rules of Thumb

- **Declarative configuration** — use YAML files for configuration
- **Resource limits** — set resource requests and limits
- **Health checks** — implement liveness and readiness probes
- **Security** — use security contexts and RBAC
- **Namespaces** — organize resources with namespaces
- **Monitoring** — implement monitoring and logging
- **Image tags** — use specific image tags
- **Documentation** — document Kubernetes configurations

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
