FROM rust:1.85-alpine AS builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src/ src/

RUN cargo build --release

FROM scratch

COPY --from=builder /app/target/release/kv /kv

EXPOSE 6379

ENTRYPOINT ["/kv"]
