# Use an official Node.js image
FROM node:22.14.0

# Set working directory inside the container
WORKDIR /app

RUN apt-get update && \
  apt-get install -y firefox-esr \
  && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (for better caching)
COPY ./ ./

# Install dependencies using pnpm
RUN corepack enable && pnpm install

# Copy the rest of the application files
COPY . .

# Build Production
RUN pnpm run build

# Expose the server port
EXPOSE 10000

# Command to start the server
CMD ["pnpm", "start"]
