# Nginx Best Practices: Starter Template

A reusable starting point derived from the **1. Server Block Structure** section of [Nginx Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    root /var/www/html;
    index index.html index.htm;
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
