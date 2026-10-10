# Overview

Focused reference for **jwt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# JWT Best Practices

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between parties. Best practice is to use JWTs with proper security measures, implement proper validation, handle token lifecycle correctly, and follow security best practices.

---

## 1. Core Concepts

- **JWT structure** — JWT consists of three parts: header, payload, and signature
- **Signing algorithms** — use strong signing algorithms (RS256, ES256)
- **Token types** — access tokens and refresh tokens
- **Claims** — standard and custom claims
- **Security** — protect against common JWT vulnerabilities

---

## 2. JWT Structure

- **Header** — contains algorithm and token type:

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

- **Payload** — contains claims:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}
```

- **Signature** — cryptographic signature:

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

---

## 3. Token Generation

- **Access token generation** — generate access tokens:

```typescript
import jwt from 'jsonwebtoken'

function generateAccessToken(userId: string, email: string): string {
  const payload = {
    sub: userId,
    email: email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (15 * 60) // 15 minutes
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256'
  })
}
```

- **Refresh token generation** — generate refresh tokens:

```typescript
function generateRefreshToken(userId: string): string {
  const payload = {
    sub: userId,
    type: 'refresh',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
  }

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    algorithm: 'HS256'
  })
}
```

- **Asymmetric signing** — use asymmetric keys for better security:
