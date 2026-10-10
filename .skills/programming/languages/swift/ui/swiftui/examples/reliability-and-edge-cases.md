# SwiftUI Best Practices: 2. View Composition

## Source guidance

This example applies the **2. View Composition** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Small reusable `View` structs over monolithic bodies** — a `body` beyond ~40 lines is a refactor signal; extract `Card`, `Row`, `EmptyState`:
- **`@ViewBuilder` for conditional content; compose with calls, not `switch` storms.**
- **Reuse via environment/scene-level factories** (`@Environment(\.factory)`-style) rather than copy-pasted stacks.
- **`some View` return everywhere; never leak concrete `HStack`/`VStack` types into signatures.**
- **Primary action is a `Button`, navigation is `NavigationLink`** — don't fake interactivity with `onTapGesture`.

## Example

```swift
struct UserCard: View {
    let user: User
    var body: some View {
        HStack(spacing: 8) { Text(user.name).bold(); Spacer(); Text(user.initials) }
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for swiftui-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
