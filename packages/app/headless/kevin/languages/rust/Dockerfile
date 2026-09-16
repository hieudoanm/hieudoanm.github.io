FROM rust:1-alpine AS builder

RUN apk add --no-cache musl-dev

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir src && echo 'fn main() {}' > src/main.rs && cargo build --release && rm -rf src

COPY . .

RUN touch src/main.rs && cargo build --release

FROM scratch

COPY --from=builder /app/target/release/kevin /kevin

EXPOSE 6379

ENTRYPOINT ["/kevin", "serve"]
