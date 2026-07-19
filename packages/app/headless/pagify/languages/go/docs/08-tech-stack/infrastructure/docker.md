# pagify — Tech Stack: Docker

Docker is optional for containerised builds.

- Multi-stage Dockerfile for minimal images.
- `CGO_ENABLED=0` for small binaries.
- No runtime server dependency in the image.
