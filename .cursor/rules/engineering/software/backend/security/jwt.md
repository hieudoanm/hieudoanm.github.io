# Token Rules — JWT

You are working in a system that uses JWTs.

## Core Principles

- JWTs are signed claims containers
- JWTs are bearer tokens
- Never trust JWTs without validation

## Validation Rules

- Verify signature
- Validate issuer and audience
- Enforce expiration strictly

## Security

- Use asymmetric signing
- Rotate keys via JWKS
- Keep tokens short-lived
- Assume token leakage

## Architecture

- Issuer signs tokens
- Resource servers validate tokens
- Business logic never trusts raw claims
