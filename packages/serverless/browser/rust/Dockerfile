# Stage 1: Build the binary
FROM rust:1.80-alpine AS builder

# Install build dependencies for static linking
RUN apk add --no-cache musl-dev

WORKDIR /app

# Cache dependencies
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

# Copy source and build
COPY . .
RUN cargo build --release

# Stage 2: Minimal runtime image
FROM alpine:latest

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/target/release/browserverless /usr/local/bin/browserverless

# Run as non-root for security
RUN addgroup -S browserverless && adduser -S browserverless -G browserverless
USER browserverless

ENTRYPOINT ["browserverless"]
