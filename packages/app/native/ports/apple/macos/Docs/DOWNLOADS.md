# Downloads

## Platforms

| Platform | Minimum Version | Download |
|----------|----------------|----------|
| macOS | 13 Ventura | [Download .dmg](https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-native-ports-latest/Ports-0.0.1.dmg) |

## Build from Source

```bash
cd packages/app/native/ports/apple/macos
make build
make app
make dmg
```

The `.dmg` file will be created in the `build/` directory.

**Note:** Ports requires no special permissions. Everything runs locally on your
Mac; no process or port information ever leaves your machine.