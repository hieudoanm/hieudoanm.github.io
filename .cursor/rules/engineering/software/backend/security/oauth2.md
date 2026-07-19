# Authorization Rules — OAuth 2.0

You are working in a system that uses OAuth 2.0.

## Core Principles

- OAuth2 is for authorization
- OIDC is for authentication
- Least privilege via scopes

## Token Rules

- Validate audience and scope
- Short-lived access tokens
- Refresh tokens handled securely

## Security

- Authorization Code + PKCE only
- Never use Implicit Flow
- Assume token leakage
- Rotate keys and revoke aggressively

## Architecture

- Auth server issues tokens
- Resource servers enforce access
- Clients never self-authorize
