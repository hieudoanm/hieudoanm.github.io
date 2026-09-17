#!/usr/bin/env bash
#
# Install pagify into a directory on your PATH.
#
#   curl -fsSL https://raw.githubusercontent.com/hieudoanm/pagify/main/scripts/install.sh | bash
#
# Set PREFIX to install somewhere other than /usr/local, and VERSION to pin a
# release. Building from source is the default because the release pipeline is
# not set up yet: it keeps the script honest about what actually works.
#
#   PREFIX=~/.local/bin ./scripts/install.sh
#   VERSION=v1.0.0 ./scripts/install.sh

set -euo pipefail

readonly REPOSITORY="github.com/hieudoanm/pagify"
readonly PREFIX="${PREFIX:-/usr/local}"
readonly BIN_DIR="${PREFIX}/bin"
readonly BINARY="pagify"

log() { printf '\033[1m==>\033[0m %s\n' "$1"; }
die() { printf '\033[31merror:\033[0m %s\n' "$1" >&2; exit 1; }

require_go() {
  command -v go >/dev/null 2>&1 || die "Go 1.27 or newer is required to build pagify"
}

install_from_source() {
  require_go
  log "Building pagify from source"
  go install "${REPOSITORY}/latest@latest"
}

# install_from_release downloads a published binary. Kept for when releases
# exist; it fails loudly rather than pretending a download worked.
install_from_release() {
  local version="$1"
  local os arch
  os="$(uname -s | tr '[:upper:]' '[:lower:]')"
  arch="$(uname -m)"

  [[ "$arch" == "arm64" ]] || die "no published binary for ${arch}"

  local url="https://${REPOSITORY}/releases/download/${version}/pagify_${os}_${arch}.tar.gz"
  local temp
  temp="$(mktemp -d)"
  trap 'rm -rf "$temp"' EXIT

  log "Downloading ${url}"
  if ! curl -fsSL "$url" -o "${temp}/pagify.tar.gz"; then
    die "no published release for ${version}"
  fi

  tar -xzf "${temp}/pagify.tar.gz" -C "$temp"
  mkdir -p "$BIN_DIR"
  install -m 0755 "${temp}/${BINARY}" "${BIN_DIR}/${BINARY}"
}

finish() {
  log "Installed ${BINARY} to ${BIN_DIR}"
  case ":${PATH}:" in
    *":${BIN_DIR}:"*) ;;
    *) printf 'Add it to your PATH:\n\n  export PATH="%s:$PATH"\n\n' "$BIN_DIR" ;;
  esac
  "${BIN_DIR}/${BINARY}" --version
}

main() {
  if [[ -n "${VERSION:-}" ]]; then
    install_from_release "$VERSION"
  else
    install_from_source
  fi
  finish
}

main "$@"
