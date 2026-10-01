# syntax=docker/dockerfile:1

# --- Build Stage ---
FROM rust:1.98.1-alpine AS builder

# musl-dev is required for the static-libc link that lets the binary run on a
# minimal runtime.
RUN apk add --no-cache musl-dev

WORKDIR /app

# Compile dependencies against a stub crate first so this layer is only
# invalidated when the manifests change, not on every source edit. build.rs is
# copied too because it contributes the slint build dependency graph.
COPY Cargo.toml Cargo.lock build.rs ./
RUN mkdir -p src \
    && echo 'fn main() {}' > src/main.rs \
    && echo '' > src/lib.rs \
    && cargo build --release --locked --bin landify \
    && rm -rf src

COPY src ./src
COPY assets ./assets

# Touch the real sources so cargo does not reuse the stub build above.
RUN touch src/main.rs src/lib.rs \
    && cargo build --release --locked --bin landify

# --- Final Stage ---
FROM alpine:3.22

RUN apk add --no-cache ca-certificates \
    && addgroup -S -g 10001 landify \
    && adduser -S -u 10001 -G landify -H landify \
    && mkdir -p /site \
    && chown landify:landify /site

COPY --from=builder /app/target/release/landify /usr/local/bin/landify

USER landify
WORKDIR /site

EXPOSE 8080

ENV PORT=8080

ENTRYPOINT ["landify"]
CMD ["serve", "--bind", "0.0.0.0", "--port", "8080", "--dir", "/site"]
