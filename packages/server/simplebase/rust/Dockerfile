FROM rust:1.85-alpine AS builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src/ src/

RUN cargo build --release

FROM scratch

COPY --from=builder /app/target/release/simplebase /simplebase

EXPOSE 8080

ENV SIMPLEBASE_DATA=/data

VOLUME ["/data"]

ENTRYPOINT ["/simplebase"]
