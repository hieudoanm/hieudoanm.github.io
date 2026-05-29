# Stage 1: Build the application
FROM node:20-slim AS builder

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
FROM node:20-slim

WORKDIR /app

# Copy package files for production dependencies
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN npm install -g pnpm && pnpm install --prod

# Copy the build output from the builder stage
COPY --from=builder /app/build ./build

# Expose port 3000 (default for SvelteKit)
EXPOSE 3000

# Start the application
CMD ["node", "build"]
