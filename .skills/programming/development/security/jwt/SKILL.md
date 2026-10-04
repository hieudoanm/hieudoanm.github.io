---
name: jwt-best-practices
description: Best practices for implementing JSON Web Tokens (JWT) for authentication and authorization. Use when designing, implementing, or reviewing JWT implementations — covers token generation, validation, security considerations, and token management.
---

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

```typescript
async function refreshAccessToken(refreshToken: string): Promise<string> {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    ) as JwtPayload

    if (decoded.type !== 'refresh') {
      throw new Error('Invalid refresh token')
    }

    // Check if refresh token is still valid in database
    const isValid = await validateRefreshTokenInDatabase(refreshToken)
    if (!isValid) {
      throw new Error('Refresh token revoked')
    }

    // Generate new access token
    return generateAccessToken(decoded.sub)
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}
```

- **Token rotation** — implement token rotation:

```typescript
async function rotateRefreshToken(oldRefreshToken: string): Promise<{
  accessToken: string
  refreshToken: string
}> {
  const decoded = jwt.verify(
    oldRefreshToken,
    process.env.JWT_REFRESH_SECRET
  ) as JwtPayload

  // Revoke old refresh token
  await revokeRefreshToken(oldRefreshToken)

  // Generate new tokens
  const accessToken = generateAccessToken(decoded.sub)
  const newRefreshToken = generateRefreshToken(decoded.sub)

  // Store new refresh token
  await storeRefreshToken(newRefreshToken, decoded.sub)

  return { accessToken, refreshToken: newRefreshToken }
}
```

---

## 7. Security Best Practices

- **Strong algorithms** — use strong signing algorithms:

```typescript
// Good - RS256 (asymmetric)
jwt.sign(payload, privateKey, { algorithm: 'RS256' })

// Good - ES256 (asymmetric)
jwt.sign(payload, privateKey, { algorithm: 'ES256' })

// Avoid - HS256 (symmetric) unless properly secured
jwt.sign(payload, secret, { algorithm: 'HS256' })

// Avoid - none (no signature)
jwt.sign(payload, '', { algorithm: 'none' })
```

- **Short expiration** — use short expiration times:

```typescript
// Access token - 15 minutes
const accessToken = jwt.sign(payload, secret, {
  expiresIn: '15m'
})

// Refresh token - 7 days
const refreshToken = jwt.sign(payload, secret, {
  expiresIn: '7d'
})
```

- **Token revocation** — implement token revocation:

```typescript
async function revokeToken(token: string): Promise<void> {
  const decoded = jwt.decode(token) as JwtPayload
  const tokenId = decoded.jti

  // Add to revocation list
  await redis.setex(
    `revoked:${tokenId}`,
    decoded.exp - Math.floor(Date.now() / 1000),
    '1'
  )
}

async function isTokenRevoked(token: string): Promise<boolean> {
  const decoded = jwt.decode(token) as JwtPayload
  const tokenId = decoded.jti

  const revoked = await redis.exists(`revoked:${tokenId}`)
  return revoked === 1
}
```

---

## 8. Implementation Examples

- **Authentication middleware** — implement authentication middleware:

```typescript
function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  try {
    const decoded = validateAccessToken(token)

    // Check if token is revoked
    if (await isTokenRevoked(token)) {
      return res.status(401).json({ error: 'Token revoked' })
    }

    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' })
  }
}
```

- **Authorization middleware** — implement authorization middleware:

```typescript
function authorizeRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles || !req.user.roles.includes(role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}
```

---

## 9. Common Vulnerabilities

- **Algorithm confusion** — prevent algorithm confusion attacks:

```typescript
function validateTokenSecurely(token: string): JwtPayload {
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256'], // Explicitly specify allowed algorithms
    ignoreNotBefore: false
  }) as JwtPayload
}
```

- **Token leakage** — prevent token leakage:

```typescript
// Always use HTTPS in production
if (process.env.NODE_ENV === 'production' && !req.secure) {
  return res.status(400).json({ error: 'HTTPS required' })
}

// Don't include tokens in URLs
// Bad: https://example.com/resource?token=xyz
// Good: Authorization: Bearer xyz
```

- **Timing attacks** — prevent timing attacks:

```typescript
import crypto from 'crypto'

function constantTimeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)

  if (bufA.length !== bufB.length) {
    return false
  }

  return crypto.timingSafeEqual(bufA, bufB)
}
```

---

## 10. Testing

- **Token generation testing** — test token generation:

```typescript
describe('generateAccessToken', () => {
  it('should generate valid token', () => {
    const token = generateAccessToken('123', 'test@example.com')
    const decoded = jwt.decode(token) as JwtPayload

    expect(decoded.sub).toBe('123')
    expect(decoded.email).toBe('test@example.com')
    expect(decoded.exp).toBeDefined()
  })
})
```

- **Token validation testing** — test token validation:

```typescript
describe('validateAccessToken', () => {
  it('should validate valid token', () => {
    const token = generateAccessToken('123', 'test@example.com')
    const decoded = validateAccessToken(token)

    expect(decoded.sub).toBe('123')
  })

  it('should reject invalid token', () => {
    expect(() => validateAccessToken('invalid')).toThrow('Invalid token')
  })

  it('should reject expired token', () => {
    const expiredToken = generateExpiredToken()
    expect(() => validateAccessToken(expiredToken)).toThrow('Token has expired')
  })
})
```

---

## 11. General Rules of Thumb

- **Strong algorithms** — use RS256 or ES256
- **Short expiration** — access tokens should expire quickly
- **Refresh tokens** — use refresh tokens for long-lived sessions
- **Secure storage** — store tokens securely (HTTP-only cookies)
- **Token revocation** — implement token revocation
- **HTTPS only** — always use HTTPS in production

---

## Quick-Start Checklist

- [ ] Strong signing algorithm (RS256/ES256)
- [ ] Short access token expiration (15 minutes)
- [ ] Refresh token implementation
- [ ] Token validation with proper checks
- [ ] HTTP-only cookie storage
- [ ] Token revocation mechanism
- [ ] Algorithm confusion prevention
- [ ] HTTPS enforcement
- [ ] Authentication middleware
- [ ] Comprehensive testing
