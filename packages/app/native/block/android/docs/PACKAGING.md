# Packaging

## Build Types

| Type    | Minify | Shrink Resources | Signing          |
| ------- | ------ | ---------------- | ---------------- |
| Debug   | No     | No               | Debug key        |
| Release | Yes    | Yes              | Release keystore |

## Release Signing

The release build expects a keystore configured via environment variables:

| Variable                 | Default            |
| ------------------------ | ------------------ |
| `RELEASE_STORE_FILE`     | `release.keystore` |
| `RELEASE_STORE_PASSWORD` | `android`          |
| `RELEASE_KEY_ALIAS`      | `release`          |
| `RELEASE_KEY_PASSWORD`   | `android`          |

For CI, set these in the environment. For local development, place a
`release.keystore` in the `app/` directory.

## ProGuard / R8

Release builds use `proguard-android-optimize.txt` plus project-specific rules
in `proguard-rules.pro`.

## Output

```bash
app/build/outputs/apk/debug/app-debug.apk
app/build/outputs/apk/release/app-release.apk
app/build/outputs/bundle/release/app-release.aab
```

## Install

```bash
# Debug
./gradlew installDebug

# Release (requires signing config)
./gradlew installRelease
```
