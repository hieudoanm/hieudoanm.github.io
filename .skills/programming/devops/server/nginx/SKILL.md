---
name: "nginx-best-practices"
description: "Best practices for Nginx configuration. Use when writing, reviewing, or optimizing Nginx server blocks and site configurations."
tags:
  - "programming"
  - "devops"
  - "server"
  - "nginx"
when_to_use: "Use when writing, reviewing, or optimizing Nginx server blocks and site configurations."
prerequisites:
  - "Familiarity with the application and its deployment environment."
  - "Access to the relevant pipeline, infrastructure, or runtime configuration."
related_skills:
  - "../apache-server/SKILL.md"
  - "../../kubernetes/SKILL.md"
  - "../../ci/circle-ci/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# Nginx Best Practices

Nginx is a high-performance web server and reverse proxy. Well-configured Nginx is secure, fast, and reliable.

---

## 1. Server Block Structure

- **Listen on port 80 (HTTP) and 443 (HTTPS)** — don't use custom ports unless necessary.
- **Use `server_name`** to match incoming requests — prefer explicit names over wildcards when possible.
- **Return 444 (close connection) for unwanted traffic** — block bots, bad user agents, or specific IPs.

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    root /var/www/html;
    index index.html index.htm;
}
```

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

- **`keepalive_timeout`** — tune keep-alive connections; default 75s is usually fine.
- **`sendfile on`** — enable for better file transfer performance (Linux only).
- **Access and error logs** — define custom log formats and rotate logs regularly.
- **`gzip` compression** — enable for text-based responses; disable for already-compressed formats.

```nginx
gzip on;
gzip_disable "msie6";
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript;
```

---

## 4. Security Hardening

- **`open_file_cache`** — cache file lookups to reduce `stat` calls.
- **`limit_req_zone`** — rate-limit requests to prevent DDoS.
- **`location ~* \.php$`** — never pass `.php` files to the filesystem; always go through a handler (e.g., PHP-FPM).
- **Deny access to sensitive files** — `.htaccess`, `.git`, `.env`, etc.

```nginx
location ~ /\.(htaccess|htaccess|git|env|yaml|yml)$ {
    deny all;
}
```

---

## 5. Quick-Start Checklist

- [ ] `server_name` explicitly set
- [ ] HTTP → HTTPS 301 redirect
- [ ] HSTS header enabled
- [ ] TLS 1.2+ only, TLS 1.3 preferred
- [ ] Strong cipher suites configured
- [ ] Gzip compression enabled for text types
- [ ] Sensitive files denied access
- [ ] Access and error logs configured