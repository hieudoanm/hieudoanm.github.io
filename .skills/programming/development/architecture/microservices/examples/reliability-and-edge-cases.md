# Microservices Architecture Best Practices: 8. Security

## Source guidance

This example applies the **8. Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Service-to-service authentication** — implement mTLS:
- **API security** — implement API keys, OAuth2, JWT
- **Network security** — implement service mesh for network security
- **Secrets management** — use secrets management service

## Example

```typescript
// mTLS configuration
const tlsConfig = {
  cert: fs.readFileSync('./certs/service-cert.pem'),
  key: fs.readFileSync('./certs/service-key.pem'),
  ca: fs.readFileSync('./certs/ca-cert.pem')
}

const httpsAgent = new https.Agent(tlsConfig)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for microservices-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
