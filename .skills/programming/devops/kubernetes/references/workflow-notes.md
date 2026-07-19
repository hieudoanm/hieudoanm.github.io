# Workflow notes

Focused reference for **kubernetes-best-practices**. The skill file provides the decision checklist; use these workflow examples as starting points.

---

## 12. Complete Examples

This example composes a namespace, non-secret configuration, workload, service, autoscaling, and ingress. Provision `myapp-secret` separately through the approved secret-management process; never commit credentials. Replace the sample image with an approved immutable image reference.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
  namespace: production
data:
  NODE_ENV: production
  LOG_LEVEL: info
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: myapp:1.2.3
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
          requests: {cpu: 250m, memory: 64Mi}
          limits: {cpu: 500m, memory: 128Mi}
        securityContext:
          allowPrivilegeEscalation: false
          runAsNonRoot: true
          runAsUser: 10001
        readinessProbe:
          httpGet: {path: /ready, port: 3000}
        livenessProbe:
          httpGet: {path: /health, port: 3000}
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: production
spec:
  selector: {app: myapp}
  ports:
  - {port: 80, targetPort: 3000}
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp
  namespace: production
spec:
  scaleTargetRef: {apiVersion: apps/v1, kind: Deployment, name: myapp}
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target: {type: Utilization, averageUtilization: 70}
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  namespace: production
spec:
  ingressClassName: nginx
  tls:
  - hosts: [myapp.example.com]
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp
            port: {number: 80}
```

Before applying, verify the ingress controller and TLS policy for the cluster, the secret exists in the same namespace, and the sample image is replaced. Validate manifests with the target cluster's schema and review rollout health after deployment.

---

## 5. Configuration Management

Keep non-sensitive settings in ConfigMaps and provision credentials through the approved secret manager. Consume both from the workload:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data: {NODE_ENV: production, PORT: "3000", LOG_LEVEL: info}
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  template:
    spec:
      containers:
      - name: app
        image: myapp:1.2.3
        envFrom:
        - configMapRef: {name: myapp-config}
        env:
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef: {name: myapp-secret, key: DATABASE_PASSWORD}
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
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
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
