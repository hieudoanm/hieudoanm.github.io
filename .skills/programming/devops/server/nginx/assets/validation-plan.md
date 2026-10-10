# Nginx Best Practices: Validation Plan

Use this plan to verify work guided by [Nginx Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Skill-specific review

- [ ] **keepalive_timeout** — tune keep-alive connections; default 75s is usually fine
- [ ] **sendfile on** — enable for better file transfer performance (Linux only)
- [ ] **Access and error logs** — define custom log formats and rotate logs regularly
- [ ] **gzip compression** — enable for text-based responses; disable for already-compressed formats
- [ ] **open_file_cache** — cache file lookups to reduce stat calls
- [ ] **limit_req_zone** — rate-limit requests to prevent DDoS
- [ ] **location ~* \.php$** — never pass .php files to the filesystem; always go through a handler (e.g., PHP-FPM)
- [ ] **Deny access to sensitive files** — .htaccess, .git, .env, etc

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
