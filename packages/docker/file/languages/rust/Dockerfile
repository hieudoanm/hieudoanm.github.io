# --- Build Stage ---
FROM rust:1.81-slim AS builder

WORKDIR /app

# Create a dummy project to cache dependencies
RUN cargo new --bin dummy
WORKDIR /app/dummy
COPY Cargo.toml Cargo.lock ./
RUN cargo build --release
RUN rm src/*.rs

# Copy the actual source code
COPY . .

# Build the application
RUN cargo build --release

# --- Final Stage ---
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies if needed
# RUN apt-get update && apt-get install -y libssl-dev && rm -rf /var/lib/apt/lists/*

# Copy the binary from the builder stage
COPY --from=builder /app/target/release/myapp ./myapp

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["./myapp"]
