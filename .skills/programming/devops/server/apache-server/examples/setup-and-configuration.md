# Apache Server Best Practices: 2. VirtualHost Structure

## Source guidance

This example applies the **2. VirtualHost Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Listen on port 80 (HTTP) and 443 (HTTPS)** — standard ports; avoid custom ports unless required.
- **Use `ServerName`** in each `VirtualHost` to suppress startup warnings.
- **Separate HTTP → HTTPS redirect** in a dedicated `<VirtualHost *:80>` block.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-server-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
