# Docker Best Practices: Workflow Checklist

A practical run sheet for applying [Docker Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Small images** — keep images small for faster builds and deployments
- [ ] 1. Core Principles: **Layer caching** — leverage Docker's layer caching for faster builds
- [ ] 2. Dockerfile Structure: **Base image selection** — use minimal, official base images:
- [ ] 2. Dockerfile Structure: **Multi-stage builds** — use multi-stage builds for smaller images:
- [ ] 3. Image Optimization: **Minimize layers** — combine related instructions:
- [ ] 3. Image Optimization: **Remove unnecessary files** — clean up after installations:
- [ ] 4. Security Best Practices: **Use minimal base images** — prefer Alpine or distroless:
- [ ] 4. Security Best Practices: **Run as non-root user** — avoid running as root:
- [ ] 5. Build Optimization: **Build arguments** — use build arguments for flexibility:
- [ ] 5. Build Optimization: **Layer caching** — leverage layer caching:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
