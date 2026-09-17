# Workflow notes

Focused reference for **oidc-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **JWKS fetching** — fetch JSON Web Key Set:

```typescript
async function fetchJwks(url: string): Promise<any> {
  const response = await fetch(url)
  const jwks = await response.json()

  return function jwtVerify getKey(header: any, callback: any) {
    const key = jwks.keys.find(
      (k: any) => k.kid === header.kid
    )

    if (!key) {
      return callback(new Error('Key not found'))
    }

    const publicKey = jwkToPem(key)
    callback(null, publicKey)
  }
}
```

---

## 4. Claims Handling

- **Standard claims** — handle standard OIDC claims:

```typescript
interface IdTokenClaims {
  iss: string        // Issuer
  sub: string        // Subject (user ID)
  aud: string[]      // Audience
  exp: number        // Expiration time
  iat: number        // Issued at
  auth_time: number  // Authentication time
  nonce: string      // Nonce
  acr: string        // Authentication context class reference
  amr: string[]      // Authentication methods references
  azp: string        // Authorized party
  at_hash: string    // Access token hash
  c_hash: string     // Code hash
  email: string      // Email
  email_verified: boolean
  name: string       // Full name
  given_name: string
  family_name: string
  middle_name: string
  nickname: string
  preferred_username: string
  profile: string
  picture: string
  website: string
  gender: string
  birthdate: string
  zoneinfo: string
  locale: string
  phone_number: string
  phone_number_verified: boolean
  address: {
    formatted: string
    street_address: string
    locality: string
    region: string
    postal_code: string
    country: string
  }
  updated_at: number
}
```

- **Custom claims** — handle custom claims:

```typescript
interface CustomClaims {
  // Custom claims specific to your application
  roles: string[]
  permissions: string[]
  organization: string
  tenant_id: string
}
```

- **Claims mapping** — map OIDC claims to user model:

```typescript
function mapClaimsToUser(claims: IdTokenClaims & CustomClaims): User {
  return {
    id: claims.sub,
    email: claims.email,
    emailVerified: claims.email_verified,
    name: claims.name,
    givenName: claims.given_name,
    familyName: claims.family_name,
    picture: claims.picture,
    roles: claims.roles || [],
    permissions: claims.permissions || [],
    organization: claims.organization,
    tenantId: claims.tenant_id
  }
}
```

---

## 5. UserInfo Endpoint

- **UserInfo request** — request additional user information:

```typescript
async function getUserInfo(accessToken: string): Promise<UserInfo> {
  const response = await fetch('https://auth.example.com/userinfo', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  return response.json()
}
```

- **UserInfo claims** — handle UserInfo response:

```typescript
interface UserInfo {
  sub: string
  name: string
  given_name: string
  family_name: string
  middle_name: string
  nickname: string
  preferred_username: string
  profile: string
  picture: string
  website: string
  email: string
  email_verified: boolean
  gender: string
  birthdate: string
  zoneinfo: string
  locale: string
  phone_number: string
  phone_number_verified: boolean
  address: {
    formatted: string
    street_address: string
    locality: string
    region: string
    postal_code: string
    country: string
  }
  updated_at: number
}
```

---

## 6. Discovery

- **Discovery document** — fetch OIDC provider configuration:
