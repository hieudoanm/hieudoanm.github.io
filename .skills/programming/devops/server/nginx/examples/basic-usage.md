# Nginx Best Practices: Basic Usage

Best practices for Nginx configuration. Use when writing, reviewing, or optimizing Nginx server blocks and site configurations.

## Scenario

Use this example as a starting point when applying **nginx-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Server Block Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    root /var/www/html;
    index index.html index.htm;
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
