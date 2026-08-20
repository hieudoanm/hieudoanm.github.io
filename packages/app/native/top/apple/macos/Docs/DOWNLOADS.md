# Downloads

## Platforms

| Platform | Minimum Version | Download |
|----------|----------------|----------|
| macOS | 13 Ventura | [Download .dmg](https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-native-top-latest/Top-0.0.1.dmg) |

## Build from Source

```bash
cd packages/app/native/top/apple/macos
make build
make app
make dmg
```

The `.dmg` file will be created in the `build/` directory.

**Note:** Top requires Accessibility permission. You will be prompted on first launch.
