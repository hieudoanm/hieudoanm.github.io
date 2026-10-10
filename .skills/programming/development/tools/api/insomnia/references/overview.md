# Overview

Focused reference for **insomnia-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Insomnia

Insomnia is an open-source API client with Git sync, a request designer, and test scripting on the same model as Postman. Its distinguishing feature is **designed API documents**: you can build a resource by describing its fields, and Insomnia derives the requests, environment variables, and mock responses from that description. Practical Insomnia work is about **keeping collections in Git as reviewable files, using the design-first workflow where it fits, and turning requests into executable tests**. Peers are covered in postman.md and bruno.md.

_Verified against Insomnia's 2026 releases (v11+). The Git-sync file layout and the design-first feature have been stable for several major versions._

---

## 1. Git Sync: Collections as Files

- **Insomnia is designed to live in Git** — a collection directory with YAML files per request, committed and reviewed like source. This is its main argument over a client whose collections live in an account.
- **Point Git sync at a dedicated folder in the repo** (`insomnia/`) and let the team work through it, so a request change is a pull request.
- **Environment files are committed with placeholder values; secrets are never committed.** A token in a committed environment file is an incident, exactly as in any client.
- **Enable sync for the workspace, not per collection,** so a new teammate gets everything by cloning and pointing at the repo.
- **Watch for merge conflicts on the collection index** — two people adding a request at once conflict in the collection file. This is the main practical cost of Git-backed collections; it is worth it, and it is a normal code-review-shaped problem.
