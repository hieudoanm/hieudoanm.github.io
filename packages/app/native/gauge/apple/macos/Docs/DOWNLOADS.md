# Downloads

## Platforms

| Platform | Minimum Version | Download |
|----------|----------------|----------|
| macOS | 13 Ventura | [Download .dmg](https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-native-gauge-latest/Gauge-0.0.1.dmg) |

## Build from Source

```bash
cd packages/app/native/gauge/apple/macos
make build
make app
make dmg
```

The `.dmg` file will be created in the `build/` directory.

**Note:** Gauge requires no special permissions. Basic monitoring works out of the box.