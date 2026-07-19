# Postman Usage Rules

You are working with Postman as an API client and testing tool.

## Core Principles

- Collections represent API intent
- Environments hold all configuration
- Requests include assertions

## Collections

- One collection per API
- Folders map to features
- No duplicated requests

## Security

- No secrets committed
- Tokens fetched dynamically
- Environments separated per stage

## Automation

- Tests for every critical request
- Newman used in CI
- Collections treated as versioned assets
