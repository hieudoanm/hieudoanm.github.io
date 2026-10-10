# Nginx Best Practices: Workflow Checklist

A practical run sheet for applying [Nginx Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Server Block Structure: **Listen on port 80 (HTTP) and 443 (HTTPS)** — don't use custom ports unless necessary
- [ ] 1. Server Block Structure: **Use server_name** to match incoming requests — prefer explicit names over wildcards when possible
- [ ] 2. SSL/TLS Configuration: **Use strong cipher suites** — TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
- [ ] 2. SSL/TLS Configuration: **Enforce HTTPS redirect** — redirect HTTP to HTTPS with a permanent (301) redirect
- [ ] 3. Performance & Logging: **keepalive_timeout** — tune keep-alive connections; default 75s is usually fine
- [ ] 3. Performance & Logging: **sendfile on** — enable for better file transfer performance (Linux only)
- [ ] 4. Security Hardening: **open_file_cache** — cache file lookups to reduce stat calls
- [ ] 4. Security Hardening: **limit_req_zone** — rate-limit requests to prevent DDoS

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
