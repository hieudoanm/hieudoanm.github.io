# Workflow notes

Focused reference for **zitadel**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Isolation & Project Model

- **One project per logical service scope**; align `aud` with the project/application
- Use **grants** to delegate org membership to projects — don't flatten every org into one role bag
- **Instances separate prod/stage/dev** and even different customers/clusters
- Configure **project roles** and have clients assert them via OIDC claims (userinfo/access token)

---

## 3. Integration & Token Handling

- **Validate access tokens locally** (RS256 + JWKS): `iss`, `aud`, `exp`
- **Cache JWKS** and handle key rotation (re-fetch on unknown `kid`)
- **Authorization from claims/grants**, not client-supplied headers
- Use **machine users with scoped `client_credentials`** for server-to-server
- **Never store or log tokens**; keep refresh tokens server-side
