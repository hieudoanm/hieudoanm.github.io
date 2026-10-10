# Review checklist

Focused reference for **apache-server-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
