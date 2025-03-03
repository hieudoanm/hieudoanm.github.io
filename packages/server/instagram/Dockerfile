# Use an official Node.js image
FROM node:22.14.0

# Set working directory inside the container
WORKDIR /app

# Install Firefox for Puppeteer and Dynamically set FIREFOX_EXECUTABLE_PATH
RUN apt-get update && apt-get install -y \
  firefox-esr \
  libasound2 \
  libcups2 \
  libgbm-dev \
  libnss3 \
  libpango1.0-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  && rm -rf /var/lib/apt/lists/* \
  && which firefox \
  && echo "export FIREFOX_EXECUTABLE_PATH=$(which firefox)" >> /etc/environment

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
