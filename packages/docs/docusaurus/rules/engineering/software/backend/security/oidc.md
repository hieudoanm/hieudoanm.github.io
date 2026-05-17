# Authentication Rules — OpenID Connect (OIDC)

You are working in a system that uses OpenID Connect.

## Core Principles

- OIDC for authentication
- OAuth2 for authorization
- Authorization Code Flow + PKCE only

## Token Rules

- Validate iss, aud, exp on every request
- ID tokens are for clients
- Access tokens are for APIs
- Short-lived tokens only

## Security

- Never use Implicit Flow
- Assume tokens can leak
- Rotate keys regularly
- Log auth failures

## Architecture

- IdP authenticates users
- Backend enforces authorization
- Frontend never decides permissions
