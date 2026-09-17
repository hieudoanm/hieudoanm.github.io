# Downloads

## Pre-built Binaries

| Platform | Architecture | Download |
|----------|--------------|----------|
| Linux | x86_64 | [pagify-linux-amd64.tar.gz](https://github.com/hieudoanm/pagify/releases/latest/download/pagify-linux-amd64.tar.gz) |
| Linux | arm64 | [pagify-linux-arm64.tar.gz](https://github.com/hieudoanm/pagify/releases/latest/download/pagify-linux-arm64.tar.gz) |
| macOS | x86_64 | [pagify-darwin-amd64.tar.gz](https://github.com/hieudoanm/pagify/releases/latest/download/pagify-darwin-amd64.tar.gz) |
| macOS | arm64 (Apple Silicon) | [pagify-darwin-arm64.tar.gz](https://github.com/hieudoanm/pagify/releases/latest/download/pagify-darwin-arm64.tar.gz) |
| Windows | x86_64 | [pagify-windows-amd64.zip](https://github.com/hieudoanm/pagify/releases/latest/download/pagify-windows-amd64.zip) |

## Installation

### Linux / macOS

```bash
# Download and install to /usr/local/bin (requires sudo)
curl -sSL https://github.com/hieudoanm/pagify/releases/latest/download/pagify-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m).tar.gz | tar -xz -C /tmp && sudo mv /tmp/pagify /usr/local/bin/pagify

# Or install to user directory (no sudo)
curl -sSL https://github.com/hieudoanm/pagify/releases/latest/download/pagify-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m).tar.gz | tar -xz -C ~/.local/bin pagify
```

### Windows (PowerShell)

```powershell
# Download and extract
$url = "https://github.com/hieudoanm/pagify/releases/latest/download/pagify-windows-amd64.zip"
$output = "$env:TEMP\pagify.zip"
Invoke-WebRequest -Uri $url -OutFile $output
Expand-Archive -Path $output -DestinationPath "$env:TEMP\pagify" -Force
Move-Item "$env:TEMP\pagify\pagify.exe" -Destination "$env:USERPROFILE\bin\pagify.exe" -Force

# Add $env:USERPROFILE\bin to PATH if not already present
```

### Go Install

```bash
go install github.com/hieudoanm/pagify@latest
```

### Homebrew (macOS)

```bash
brew tap hieudoanm/pagify
brew install pagify
```

## Verify Download

```bash
# Check version
pagify --version

# Verify checksum (replace with actual checksum from release page)
sha256sum pagify-linux-amd64.tar.gz
```

## Release Notes

See the [releases page](https://github.com/hieudoanm/pagify/releases) for changelogs and release notes.