# Android: Starter Template

A reusable starting point derived from the **3. Manifest, Permissions & Edge-to-Edge** section of [Android](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        setContent { AppTheme { App() } }
    }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
