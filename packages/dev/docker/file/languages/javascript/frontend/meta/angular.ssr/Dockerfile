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
# For Angular SSR, the output structure varies, but often involves a server bundle
# Adjust this path based on your angular.json (e.g., dist/app/server)
COPY --from=builder /app/dist ./dist

# Expose port 4000 (default for Angular Universal/SSR)
EXPOSE 4000

# Start the application
# Adjust the entry point to your server main file
CMD ["node", "dist/server/main.server.mjs"]
