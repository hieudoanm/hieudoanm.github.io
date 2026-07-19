FROM rust:1.85-alpine AS builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src/ src/
COPY public/ public/

RUN cargo build --release

FROM scratch

COPY --from=builder /app/target/release/backbone /backbone
COPY --from=builder /app/public /public

ENV PORT=8080
ENV BACKBONE_DATA=/data

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

VOLUME ["/data"]

ENTRYPOINT ["/backbone"]
