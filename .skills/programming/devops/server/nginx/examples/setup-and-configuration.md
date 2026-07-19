# Nginx Best Practices: 2. SSL/TLS Configuration

## Source guidance

This example applies the **2. SSL/TLS Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use strong cipher suites** — `TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`.
- **Enforce HTTPS redirect** — redirect HTTP to HTTPS with a permanent (301) redirect.
- **Enable HSTS** — `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;`.
- **Prefer ECDHE over RSA** — forward-secret perfect forward secrecy.

## Example

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    ssl_protocols TLSv1.3 TLSv1.2;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://backend;
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for nginx-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
