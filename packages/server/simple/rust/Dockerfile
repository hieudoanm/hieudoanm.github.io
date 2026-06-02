FROM rust:1.85-alpine AS builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src/ src/
COPY public/ public/

RUN cargo build --release

FROM scratch

COPY --from=builder /app/target/release/simple /simple
COPY --from=builder /app/public /public

ENV PORT=8080
ENV SIMPLE_DATA=/data

EXPOSE 8080

VOLUME ["/data"]

ENTRYPOINT ["/simple"]
