# Stage 1: Build the application
FROM node:20.20.2-slim AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Run the application
FROM node:20.20.2-slim

WORKDIR /app

# Copy the build output from the builder stage
# Solid Start (Nitro) outputs to .output
COPY --from=builder /app/.output ./.output

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
