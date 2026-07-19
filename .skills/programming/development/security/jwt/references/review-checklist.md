# Review checklist

Focused reference for **jwt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
