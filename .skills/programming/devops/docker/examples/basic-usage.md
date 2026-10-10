# Docker Best Practices: Basic Usage

Best practices for using Docker for containerization. Use when creating, structuring, or reviewing Dockerfiles and Docker configurations — covers image optimization, security, multi-stage builds, and container orchestration.

## Scenario

Use this example as a starting point when applying **docker-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Dockerfile Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```dockerfile
# Good - Minimal and specific
FROM node:18-alpine AS base

# Avoid - Latest tag
FROM node:latest

# Avoid - Large base images
FROM node:18
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
