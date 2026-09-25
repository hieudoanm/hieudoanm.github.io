---
name: apache-server-best-practices
description: Best practices for Apache HTTP Server configuration. Use when writing, reviewing, or optimizing httpd.conf and site configurations.
---

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

---

## 2. VirtualHost Structure

- **Listen on port 80 (HTTP) and 443 (HTTPS)** — standard ports; avoid custom ports unless required.
- **Use `ServerName`** in each `VirtualHost` to suppress startup warnings.
- **Separate HTTP → HTTPS redirect** in a dedicated `<VirtualHost *:80>` block.

```apache
<VirtualHost *:80>
    ServerName example.com
    Redirect permanent / https://example.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName example.com

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
    SSLCertificateChainFile /path/to/chain.pem

    DocumentRoot /var/www/html
    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>
</VirtualHost>
```

---

## 3. Performance tuning

- **`KeepAlive On`** with `KeepAliveTimeout 5` — enable persistent connections; tune timeout for your workload.
- **`MaxRequestWorkers`** — set based on available memory; default 150 may be too high for low-RAM servers.
- **`EnableSendfile on`** — improve static file delivery on Linux (disable on some virtualized environments).

```apache
<IfModule mpm_prefork_module>
    MaxRequestWorkers 100
    StartServers 5
    MinSpareServers 5
    MaxSpareServers 10
</IfModule>

<IfModule mpm_event_module>
    KeepAliveTimeout 5
    MaxRequestWorkers 150
    ThreadsPerChild 25
</IfModule>

EnableSendfile on
```

---

## 4. Security hardening

- **`ServerTokens Prod`** — expose only `Apache` in server header, not version or modules.
- **`ServerSignature Off`** — suppress trailing footer on error pages.
- **`Directory` restrictions** — use `Require all denied` for `.htaccess`, `.git`, and other sensitive directories.
- **`mod_security`** — deploy rule set for WAF protection.

```apache
<FilesMatch "^\.htaccess$|\.git">
    Require all denied
</FilesMatch>

ServerTokens Prod
ServerSignature Off
```

---

## 5. Quick-Start Checklist

- [ ] Only necessary modules loaded
- [ ] `ServerName` set in each `VirtualHost`
- [ ] HTTP → HTTPS redirect in separate `:80` block
- [ ] SSL/TLS configured in `:443` block
- [ ] `MaxRequestWorkers` tuned for available memory
- [ ] `ServerTokens Prod` and `ServerSignature Off`
- [ ] Sensitive directories denied access
- [ ] `EnableSendfile on` for performance