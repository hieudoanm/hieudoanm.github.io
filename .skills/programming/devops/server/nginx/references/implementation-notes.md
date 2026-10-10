# Implementation notes

Focused reference for **nginx-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
