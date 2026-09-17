# Review checklist

Focused reference for **github-actions-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 9. Reusable Workflows

- **Create reusable workflows:**

```yaml
# .github/workflows/reusable-workflow.yml
name: Reusable Workflow

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - name: Run tests
        run: npm test
```

- **Use reusable workflows for common tasks.**
- **Use inputs for configuration.**
- **Use outputs for sharing data.**

---

## 10. Security

- **Use security best practices:**

```yaml
steps:
  - name: Run security scan
    uses: actions/security-scan/action@v1
    with:
      severity: 'high,critical'
```

- **Use security scanning tools.**
- **Use code scanning for dependency vulnerabilities.**
- **Use security alerts for security notifications.**

---

## 11. General Rules of Thumb

- **Workflow design** — design workflows efficiently
- **Caching** — use caching for speed
- **Matrix strategy** — test across multiple configurations
- **Secrets** — use GitHub Secrets for sensitive data
- **Artifacts** — use artifacts for file sharing
- **Security** — implement security best practices
- **Documentation** — document workflows

---

## Quick-Start Checklist

- [ ] Appropriate workflow triggers configured
- [ ] Jobs configured with appropriate runners
- [ ] Caching configured for dependencies
- [ ] Matrix strategy for multiple configurations
- [ ] Secrets used for sensitive data
- [ ] Artifacts configured for file sharing
- [ ] Deployment configured appropriately
- [ ] Security scanning implemented
- [ ] Documentation complete
- [ ] Performance optimized
