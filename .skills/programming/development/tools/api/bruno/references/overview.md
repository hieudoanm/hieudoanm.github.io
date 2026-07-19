# Overview

Focused reference for **bruno-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Bruno

Bruno is an open-source API client whose defining choice is **a collection is a directory of plain text files in your Git repository** — no account, no sync service, no proprietary collection format. A request is a `.bru` file you read in a diff. Practical Bruno work is about **leaning into that property, keeping scripts small and reviewable, and treating the collection as a test suite**. Peers are in postman.md and insomnia.md.

_Verified against Bruno's 2026 releases (v2.x). The `.bru` format and collection layout are stable; scripting follows Postman-compatible APIs with Bruno-specific additions._

---

## 1. Files in the Repository

- **The collection is a folder of `.bru` files in the repo** — committed, diffed, and reviewed like any other source. This is the reason to use Bruno over a client that stores collections in an account.
- **Keep it in a dedicated folder** (`bruno/` or `api/`) with the environments beside it, so the whole API surface is one reviewable path.
- **No account and no sync means no lock-in and no secrets in a vendor's database** — an environment file is a local, gitignored file with the real values.
- **Commit the environment templates; gitignore the populated ones.** A committed live token is an incident, as in any client.
- **A `.bru` file is small and readable, so use the folder hierarchy to mirror the API** — one folder per resource, files named for the operation.

```text
bruno/
  collection.bru
  environments/
    local.bru        # gitignored
    staging.bru      # template committed
  users/
    create-user.bru
    get-user.bru
  billing/
    list-invoices.bru
```
