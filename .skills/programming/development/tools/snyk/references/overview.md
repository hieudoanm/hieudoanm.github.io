# Overview

Focused reference for **snyk-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Snyk

Snyk is a security scanner across four surfaces — application code, dependencies, infrastructure as code, and container images — and its weakness is the same as every scanner's: **it reports what matches a signature, not what is exploitable in your code**. A critical finding in a dev-only dependency that never ships and is never imported is a false positive in everything but the letter of the rule. Practical Snyk work is about **triage by reachability and exposure, not by severity number, and fixing the cause rather than the finding**. Routine update automation is a different job; see renovate.md.

_Verified against Snyk's 2026 products. Plan names, the free tier's limits, and CLI behaviour change frequently; the triage discipline below does not._

---

## 1. What Each Scanner Actually Sees

- **Four distinct products, one workflow.** `snyk code` (your source), `snyk dep audit` (the dependency tree), `snyk iac` (Terraform/K8s/etc.), `snyk container` (an image). They overlap and disagree; understanding which one produced a finding explains most of the inconsistency.
- **Snyk Code analyses your source for vulnerable patterns** — SQL injection, path traversal, insecure deserialisation. It reasons about dataflow within a function and is weakest where data crosses a boundary it cannot see (serialised payloads, reflection through a queue, native calls).
- **`snyk dep audit` walks the dependency tree** and matches versions against advisory data. This is the one most likely to report something you have never imported.
- **`Snyk IaC` catches misconfiguration**, which is the highest-yield scan in most cloud repos: a public bucket, an over-permissive IAM policy, and an unencrypted database are found here and nowhere else.
- **`snyk container` analyses the image you actually ship,** which is more accurate than the dependency tree because it sees what the build removed — or failed to remove.
- **Severity is a property of the vulnerability, not of your exposure.** A "High" in a test fixture and a "High" on a request handler are the same finding to the scanner and not remotely the same risk to you.

---
