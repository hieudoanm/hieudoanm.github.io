# Implementation notes

Focused reference for **volta-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. CI Integration

- **CI: install Volta, run via the pinned hook:**

```bash
curl https://get.volta.sh | bash      # then PATH
volta install node@20
volta run --node=20 yarn ci
```

- **Or honor the block directly: `volta run node --version` proves the engine.**
- **Cache `.volta` in CI (bolt off the network); pinned versions cached by hashes.**

---

## 5. Compat & Troubleshooting

- **Ensure the `volta` block and `engines` don't disagree — `engines` is a check, `volta` is the enforcer.**
- **Proxy/corporate registries: `VOLTA_FEATURE_PNPM` etc. as needed; mirrors for offline.**
- **Migrate from nvm/system-managed: uninstall old, `volta pin` then `volta install`.**
