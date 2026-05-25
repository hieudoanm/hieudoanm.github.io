# --- Build Stage ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install

# Copy the rest of the source code
COPY . .

# Build the application
RUN pnpm build

# --- Final Stage ---
FROM node:22-alpine

WORKDIR /app

# Copy built assets and production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
