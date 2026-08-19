# Snap (Downloads)

## Platforms

| Platform | Requirements | Download Link                          |
| -------- | ------------ | -------------------------------------- |
| macOS    | 13.+         | [Download `.dmg`][download-dmg]        |

## Build from Source

```bash
cd packages/app/native/snap/apple/macos
make build
make app
make dmg
```

The DMG will be created at `build/Snap-0.0.1.dmg`.

**Note:** Snap requires Accessibility permission to manage windows. Grant
permission in System Settings > Privacy & Security > Accessibility when prompted.

[download-dmg]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-native-snap-latest/Snap-0.0.1.dmg
