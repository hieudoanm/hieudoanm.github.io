#!/bin/sh

# Prepare folder
pnpm rimraf src-tauri/dist
# Build dmg for MacOS
mkdir -p src-tauri/dist/dmg
pnpm tauri build --bundles dmg
pnpm cpr src-tauri/target/release/bundle/dmg/ ./src-tauri/dist/dmg --overwrite
# Build ext for Windows
mkdir -p src-tauri/dist/exe
pnpm tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc
pnpm cpr src-tauri/target/x86_64-pc-windows-msvc/release/bundle/nsis/ ./src-tauri/dist/exe --overwrite
