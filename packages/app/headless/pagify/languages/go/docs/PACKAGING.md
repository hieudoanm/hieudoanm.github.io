# Packaging Guide

This document describes how to package pagify for different distribution channels.

## Binary Build

### Cross-compilation

```bash
# Build for all platforms
make build-all

# Output: bin/pagify-linux-amd64, bin/pagify-linux-arm64, bin/pagify-darwin-amd64, bin/pagify-darwin-arm64, bin/pagify-windows-amd64.exe
```

### Build Flags

```bash
# Standard build
CGO_ENABLED=0 go build -o pagify .

# With version info (injected at build time)
CGO_ENABLED=0 go build -ldflags "-X main.version=v1.2.3 -X main.commit=$(git rev-parse HEAD) -X main.date=$(date -u +%Y-%m-%dT%H:%M:%SZ)" -o pagify .
```

## Archive Creation

### Linux/macOS (tar.gz)

```bash
# Create release archive
mkdir -p dist/pagify
cp bin/pagify-linux-amd64 dist/pagify/pagify
cp LICENSE dist/pagify/
cp README.md dist/pagify/
tar -czf pagify-linux-amd64.tar.gz -C dist pagify
```

### Windows (zip)

```bash
mkdir -p dist/pagify
cp bin/pagify-windows-amd64.exe dist/pagify/pagify.exe
cp LICENSE dist/pagify/
cp README.md dist/pagify/
cd dist && zip -r ../pagify-windows-amd64.zip pagify
```

## Package Managers

### Homebrew Formula

```ruby
# Formula/pagify.rb
class Pagify < Formula
  desc "Write Markdown. Run one command. Get a beautiful website."
  homepage "https://github.com/hieudoanm/pagify"
  url "https://github.com/hieudoanm/pagify/archive/refs/tags/v1.2.3.tar.gz"
  sha256 "..."

  depends_on "go" => :build

  def install
    system "go", "build", *std_go_args(ldflags: "-s -w -X main.version=v1.2.3"), "./..."
  end

  test do
    system "#{bin}/pagify", "--version"
  end
end
```

### AUR (Arch Linux)

```bash
# PKGBUILD
pkgname=pagify
pkgver=1.2.3
pkgrel=1
pkgdesc="Write Markdown. Run one command. Get a beautiful website."
arch=('x86_64' 'aarch64')
url="https://github.com/hieudoanm/pagify"
license=('GPL-3.0')
makedepends=('go')
source=("pagify-${pkgver}.tar.gz::https://github.com/hieudoanm/pagify/archive/refs/tags/v${pkgver}.tar.gz")
sha256sums=('...')

build() {
  cd "pagify-${pkgver}"
  export CGO_ENABLED=0
  go build -ldflags "-s -w -X main.version=v${pkgver}" -o pagify .
}

package() {
  cd "pagify-${pkgver}"
  install -Dm755 pagify "${pkgdir}/usr/bin/pagify"
  install -Dm644 LICENSE "${pkgdir}/usr/share/licenses/${pkgname}/LICENSE"
}
```

### Debian/Ubuntu (.deb)

```bash
# Using nfpm (https://nfpm.goreleaser.com)
# nfpm.yaml
name: "pagify"
version: "v1.2.3"
arch: "amd64"
maintainer: "Your Name <email@example.com>"
description: "Write Markdown. Run one command. Get a beautiful website."
license: "GPL-3.0"
vendor: "hieudoanm"
homepage: "https://github.com/hieudoanm/pagify"
bindir: "/usr/bin"
contents:
  - src: "bin/pagify-linux-amd64"
    dst: "/usr/bin/pagify"
  - src: "LICENSE"
    dst: "/usr/share/doc/pagify/copyright"
```

```bash
nfpm package --target linux_amd64.deb
```

### RPM

```bash
# nfpm.yaml (add to contents)
# targets: [deb, rpm]
nfpm package --target linux_amd64.rpm
```

## Docker Image

See [docker/Dockerfile](../docker/Dockerfile) for the official Docker image.

```dockerfile
# Multi-stage build for minimal image
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o pagify .

FROM alpine:3.20
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/pagify /usr/local/bin/pagify
ENTRYPOINT ["pagify"]
```

## Release Checklist

- [ ] Update version in source (if applicable)
- [ ] Run `make test` and `make lint`
- [ ] Run `make build-all`
- [ ] Create archives for each platform
- [ ] Generate SHA256 checksums: `sha256sum dist/* > checksums.txt`
- [ ] Create GitHub release with assets
- [ ] Update Homebrew formula (if maintaining tap)
- [ ] Update AUR package (if maintaining)
- [ ] Push Docker image: `docker push hieudoanm/pagify:v1.2.3`

## CI/CD (GitHub Actions)

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        include:
          - goos: linux
            goarch: amd64
          - goos: linux
            goarch: arm64
          - goos: darwin
            goarch: amd64
          - goos: darwin
            goarch: arm64
          - goos: windows
            goarch: amd64
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: '1.23' }
      - run: CGO_ENABLED=0 GOOS=${{ matrix.goos }} GOARCH=${{ matrix.goarch }} go build -ldflags="-s -w" -o pagify${{ matrix.goos == 'windows' && '.exe' || '' }} .
      - uses: actions/upload-artifact@v4
        with:
          name: pagify-${{ matrix.goos }}-${{ matrix.goarch }}
          path: pagify*
  
  release:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
      - run: sha256sum * > checksums.txt
      - uses: softprops/action-gh-release@v1
        with:
          files: |
            pagify-*/*
            checksums.txt
```

## Signing (Optional)

```bash
# GPG sign archives
gpg --armor --detach-sign pagify-linux-amd64.tar.gz

# Verify
gpg --verify pagify-linux-amd64.tar.gz.asc pagify-linux-amd64.tar.gz
```