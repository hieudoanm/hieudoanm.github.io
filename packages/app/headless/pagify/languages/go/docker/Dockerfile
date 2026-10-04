# =============================================================================
# pagify Dockerfile
# Multi-stage build for minimal production image
# =============================================================================

# -----------------------------------------------------------------------------
# Build stage
# -----------------------------------------------------------------------------
FROM golang:1.23-alpine AS builder

# Install build dependencies
RUN apk add --no-cache git make

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the binary
# CGO_ENABLED=0 for static binary
# -ldflags="-s -w" strips debug info and symbol table
RUN CGO_ENABLED=0 make build-all

# -----------------------------------------------------------------------------
# Runtime stage (distroless-style with Alpine)
# -----------------------------------------------------------------------------
FROM alpine:3.20 AS runtime

# Install runtime dependencies
# ca-certificates for HTTPS, tzdata for timezone support
RUN apk add --no-cache ca-certificates tzdata

# Create non-root user
RUN addgroup -g 1000 -S pagify && \
    adduser -u 1000 -S pagify -G pagify

# Copy binary from builder
COPY --from=builder /app/bin/pagify-linux-amd64 /usr/local/bin/pagify

# Use non-root user
USER pagify

# Default working directory (mount content here)
WORKDIR /content

# Expose default serve port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD pagify --version || exit 1

# Default command shows help
ENTRYPOINT ["pagify"]
CMD ["--help"]

# -----------------------------------------------------------------------------
# Alternative: scratch-based image (smallest possible)
# -----------------------------------------------------------------------------
# FROM scratch AS minimal
#
# COPY --from=builder /app/bin/pagify-linux-amd64 /pagify
# COPY --from=runtime /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
# COPY --from=runtime /usr/share/zoneinfo /usr/share/zoneinfo
#
# ENTRYPOINT ["/pagify"]
# CMD ["--help"]

# -----------------------------------------------------------------------------
# Usage Examples
# -----------------------------------------------------------------------------
#
# Build:
#   docker build -t pagify -f docker/Dockerfile .
#
# Build site:
#   docker run --rm -v $(pwd)/docs:/content -v $(pwd)/dist:/output pagify build /content --output /output
#
# Serve locally:
#   docker run --rm -p 8080:8080 -v $(pwd)/docs:/content pagify serve /content --port 8080
#
# With custom config (frontmatter in index.md):
#   # No extra config needed - uses index.md frontmatter
#
# With pagify.yaml:
#   docker run --rm -v $(pwd)/docs:/content -v $(pwd)/dist:/output pagify build /content --output /output
#
# CI/CD (GitHub Actions):
#   - name: Build site
#     run: |
#       docker run --rm -v ${{ github.workspace }}/docs:/content -v ${{ github.workspace }}/dist:/output pagify build /content --output /output
#
# Kubernetes:
#   apiVersion: batch/v1
#   kind: Job
#   metadata:
#     name: pagify-build
#   spec:
#     template:
#       spec:
#         containers:
#         - name: pagify
#           image: pagify:latest
#           command: ["build", "/content", "--output", "/output"]
#           volumeMounts:
#           - name: content
#             mountPath: /content
#           - name: output
#             mountPath: /output
#         volumes:
#         - name: content
#           configMap:
#             name: docs-content
#         - name: output
#           emptyDir: {}
#         restartPolicy: Never