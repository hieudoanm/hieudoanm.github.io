# Implementation notes

Focused reference for **apache-server-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
