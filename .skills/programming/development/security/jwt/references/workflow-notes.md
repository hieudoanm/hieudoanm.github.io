# Workflow notes

Focused reference for **jwt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```typescript
import jwt from 'jsonwebtoken'
import fs from 'fs'

function generateAccessTokenWithPrivateKey(userId: string): string {
  const privateKey = fs.readFileSync('./private.key')

  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (15 * 60)
  }

  return jwt.sign(payload, privateKey, { algorithm: 'RS256' })
}
```

---

## 4. Token Validation

- **Token validation** — validate JWT tokens:

```typescript
function validateAccessToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    }) as JwtPayload

    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}
```

- **Asymmetric validation** — validate with public key:

```typescript
function validateAccessTokenWithPublicKey(token: string): JwtPayload {
  const publicKey = fs.readFileSync('./public.key')

  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    }) as JwtPayload

    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}
```

- **Claim validation** — validate specific claims:

```typescript
function validateClaims(decoded: JwtPayload): void {
  const now = Math.floor(Date.now() / 1000)

  if (decoded.exp && decoded.exp < now) {
    throw new Error('Token has expired')
  }

  if (decoded.nbf && decoded.nbf > now) {
    throw new Error('Token not yet valid')
  }

  if (decoded.iss && decoded.iss !== process.env.JWT_ISSUER) {
    throw new Error('Invalid issuer')
  }

  if (decoded.aud && !decoded.aud.includes(process.env.JWT_AUDIENCE)) {
    throw new Error('Invalid audience')
  }
}
```

---

## 5. Token Storage

- **HTTP-only cookies** — store tokens in HTTP-only cookies:

```typescript
function setTokenCookie(res: Response, token: string): void {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  })
}
```

- **Local storage** — store tokens in local storage (less secure):

```typescript
function setTokenInLocalStorage(token: string): void {
  localStorage.setItem('accessToken', token)
}

function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem('accessToken')
}
```

- **Session storage** — store tokens in session storage:

```typescript
function setTokenInSessionStorage(token: string): void {
  sessionStorage.setItem('accessToken', token)
}
```

---

## 6. Token Refresh

- **Refresh token flow** — implement refresh token flow:
