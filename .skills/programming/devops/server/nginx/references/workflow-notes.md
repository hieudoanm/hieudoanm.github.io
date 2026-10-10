# Workflow notes

Focused reference for **nginx-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. SSL/TLS Configuration

- **Use strong cipher suites** — `TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`.
- **Enforce HTTPS redirect** — redirect HTTP to HTTPS with a permanent (301) redirect.
- **Enable HSTS** — `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;`.
- **Prefer ECDHE over RSA** — forward-secret perfect forward secrecy.

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

---

## 3. Performance & Logging
