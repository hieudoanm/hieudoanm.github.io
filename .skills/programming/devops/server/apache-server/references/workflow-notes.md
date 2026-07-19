# Workflow notes

Focused reference for **apache-server-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
