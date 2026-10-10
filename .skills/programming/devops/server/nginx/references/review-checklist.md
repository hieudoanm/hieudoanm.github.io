# Review checklist

Focused reference for **nginx-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Quick-Start Checklist

- [ ] `server_name` explicitly set
- [ ] HTTP → HTTPS 301 redirect
- [ ] HSTS header enabled
- [ ] TLS 1.2+ only, TLS 1.3 preferred
- [ ] Strong cipher suites configured
- [ ] Gzip compression enabled for text types
- [ ] Sensitive files denied access
- [ ] Access and error logs configured
