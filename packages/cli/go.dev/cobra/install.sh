#!/bin/bash

# Ensure the script is run with sudo
if [[ $EUID -ne 0 ]]; then
    echo "This script requires sudo privileges. Re-running with sudo..."
    exec sudo "$0" "$@"
    exit 1
fi

# Define variables
BIN_NAME="nothing"  # Change this to your binary name
GITHUB_RAW_URL="https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/master/packages/cli/go/cobra/bin/nothing"  # Update this URL

# Ensure BIN_NAME is not empty
if [[ -z "$BIN_NAME" ]]; then
    echo "Error: BIN_NAME is empty!"
    exit 1
fi

# Destination path
DEST_PATH="/usr/local/bin/$BIN_NAME"

# Download the binary
echo "Downloading $BIN_NAME to $DEST_PATH..."
sudo rm -rf "$DEST_PATH"
echo "$DEST_PATH"
curl -L -o "$DEST_PATH" "$GITHUB_RAW_URL"

# Make it executable
sudo chmod +x "$DEST_PATH"

# Verify installation
if command -v "$BIN_NAME" &>/dev/null; then
    echo "$BIN_NAME installed successfully!"
else
    echo "Installation failed."
    exit 1
fi
