# Kubernetes Best Practices: Starter Template

A reusable starting point derived from the **4. Service Configuration** section of [Kubernetes Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
