# Overview

Focused reference for **llrt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# LLRT Best Practices

LLRT (**Low Latency Runtime**) is **an optimized-embedding runtime (QuickJS-based) for AWS Lambda JS functions — cold starts ~2–5x faster than Node** with a trimmed engine surface. Practical LLRT leans on **explicit runtime pinning (`aws-lambda-js-rt` extension / binary download), staying inside the supported JS surface (no Node-only globals), small bundles, and measuring cold-start under your own load** — LLRT's wins come from its env (embedding) — respect that: fewer deps, fewer Node-isms.

---

## 1. Runtime Setup

- **Pin the LLRT layer/version explicitly:**

```bash
# Package the function with the LLRT binary as the container entrypoint
```

- **Official pattern: image `public.ecr.aws/lambda/llrt` (or the binary in memory) pinned by SHA;**
- **Functions deployed with `Runtime: provided.al2`/custom + LLRT runtime handler — document the version parity.**

---
