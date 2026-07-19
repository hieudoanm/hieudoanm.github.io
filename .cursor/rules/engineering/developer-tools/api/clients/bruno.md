# Bruno Usage Rules

You are using Bruno as a Git-first, file-based API client.

## Core Principles

- Requests are code
- Git is the collaboration layer
- Environments are never committed

## Structure

- One API per folder
- One request per file
- Clear, stable naming

## Security

- No secrets in Git
- Use env files and CI secrets

## Automation

- Tests live with requests
- Bruno CLI runs in CI
