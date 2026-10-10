# Implementation notes

Focused reference for **kubernetes-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
    image: myapp:1.2.3
    volumeMounts:
    - name: data-volume
      mountPath: /data
  volumes:
  - name: data-volume
    persistentVolumeClaim:
      claimName: myapp-pvc
```

`hostPath` is appropriate only for local or single-node testing; use a cluster-supported StorageClass or provisioner for shared and production workloads.

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
    image: myapp:1.2.3
    env:
    - name: LOG_LEVEL
      value: "info"
    - name: LOG_FORMAT
      value: "json"
```


## Complete deployment guidance

Combine namespace, configuration, secret references, workload, service, ingress, autoscaling, and policy resources in declarative manifests. Keep each resource scoped to the intended namespace and verify selectors, ports, probes, and resource limits together. Use an external secret manager or encrypted-at-rest workflow for credentials; base64-encoded Kubernetes Secret values are not encryption. Pin production images to an immutable digest, and avoid privileged host-path mounts unless the workload has a reviewed, explicit need.
