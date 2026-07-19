# Overview

Focused reference for **nginx-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
