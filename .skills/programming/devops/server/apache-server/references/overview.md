# Overview

Focused reference for **apache-server-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Apache Server Best Practices

Apache is a widely used web server. Proper configuration ensures performance, security, and maintainability.

---

## 1. Module Loading

- **Load only necessary modules** — `LoadModule` only what you use; avoid `mod_status`, `mod_info` on production servers.
- **Use `mod_identify` sparingly** — only for intranet access logging.
- **Enable `mod_proxy` and `mod_proxy_fcgi`** for reverse proxy / PHP-FPM setups.

```apache
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so
```
