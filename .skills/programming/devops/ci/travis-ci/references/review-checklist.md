# Review checklist

Focused reference for **travis-ci-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Use Docker for containerized builds.**
- **Use services for additional containers.**
- **Use Docker Compose for multi-container apps.**

---

## 9. Notifications

- **Configure build notifications:**

```yaml
notifications:
  email:
    recipients:
      - build@example.com
    on_success: change
    on_failure: always
```

- **Use notifications for build status updates.**
- **Use appropriate notification channels.**
- **Configure notification triggers appropriately.**

---

## 10. General Rules of Thumb

- **Build matrix** — test across multiple configurations
- **Caching** — use caching for speed
- **Stages** — use stages for organization
- **Security** — use encrypted secrets
- **Notifications** — configure notifications
- **Documentation** — document builds

---

## Quick-Start Checklist

- [ ] Appropriate language configured
- [ ] Build matrix configured
- [ ] Caching configured
- [ ] Stages configured
- [ ] Environment variables set
- [ ] Secrets encrypted
- [ ] Deployment configured
- [ ] Notifications configured
- [ ] Documentation complete
- [ ] Performance optimized
