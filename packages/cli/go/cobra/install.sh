#!/bin/bash

# Define variables
BIN_NAME="hieu"  # Change this to your binary name
GITHUB_RAW_URL="https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/master/packages/cli/go/cobra/bin/hieu"  # Update this URL

# Destination path
DEST_PATH="/usr/local/bin/$BIN_NAME"

# Ensure the script is run with sudo
if [[ $EUID -ne 0 ]]; then
    echo "This script requires sudo privileges. Re-running with sudo..."
    exec sudo "$0" "$@"
    exit 1
fi

# Download the binary
echo "Downloading $BIN_NAME..."
sudo rm -rf "$DEST_PATH"
sudo curl -L -o "$DEST_PATH" "$GITHUB_RAW_URL"

# Make it executable
sudo chmod +x "$DEST_PATH"

# Verify installation
if command -v "$BIN_NAME" &>/dev/null; then
    echo "$BIN_NAME installed successfully!"
else
    echo "Installation failed."
    exit 1
fi
