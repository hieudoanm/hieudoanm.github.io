# Flutter Best Practices: Basic Usage

Best practices for building Flutter apps — the framework conventions for declarative UIs on iOS/Android/web/desktop. Use when writing, structuring, or reviewing Flutter — covers widgets, state management, layout, navigation, theming, async/data, testing, performance, and tooling.

## Scenario

Use this example as a starting point when applying **flutter-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Widget Composition** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```dart
class UserAvatar extends StatelessWidget {
  const UserAvatar({super.key, required this.user});
  final User user;
  @override
  Widget build(BuildContext context) => CircleAvatar(child: Text(user.initials));
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
