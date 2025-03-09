#!/bin/bash

# Define variables
BIN_NAME="hieudoanm"  # Change this to your binary name
GITHUB_RAW_URL="https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/master/packages/cli/go/cobra/bin/hieudoanm"  # Update this URL

# Destination path
DEST_PATH="/usr/local/bin/$BIN_NAME"

# Download the binary
echo "Downloading $BIN_NAME..."
curl -L -o "$DEST_PATH" "$GITHUB_RAW_URL"

# Make it executable
chmod +x "$DEST_PATH"

# Verify installation
if command -v "$BIN_NAME" &>/dev/null; then
    echo "$BIN_NAME installed successfully!"
else
    echo "Installation failed."
    exit 1
fi
