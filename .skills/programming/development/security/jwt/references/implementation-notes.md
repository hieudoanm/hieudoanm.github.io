# Implementation notes

Focused reference for **jwt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
