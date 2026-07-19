# Packaging

Brewery is built entirely from source with the Swift Package Manager and bundled into a standard macOS `.app` using the `Makefile`. No Xcode project is required.

## Makefile targets

| Target | Description |
| --- | --- |
| `make build` | Debug build via `swift build`. |
| `make test` | Run unit tests. |
| `make app` | Build release binary + assemble `build/Brewery.app` (incl. icon, Info.plist, entitlements). |
| `make dmg` | Wrap `build/Brewery.app` in a `.dmg`. |
| `make dev` | Build (debug) and launch the app. |
| `make clean` | Remove build artifacts. |

## Bundle layout

```
build/Brewery.app/
├── Contents/
│   ├── Info.plist
│   ├── MacOS/
│   │   └── Brewery          (release executable)
│   └── Resources/
│       └── AppIcon.icns
```

## Code signing

The `Makefile` ad-hoc signs the bundle so it can run locally. For distribution, replace ad-hoc signing with a Developer ID certificate and enable the hardened runtime.

## App icon

The icon is generated from `Resources/AppIcon.iconset/AppIcon-source.svg` by `AppIcon-render.swift` (CoreGraphics), then rasterized to all required sizes with `sips` and packed into `.icns` via `iconutil`. Tracked source-of-truth files are the `.svg` and the renderer; the generated `.icns` and intermediate PNGs are build artifacts.
