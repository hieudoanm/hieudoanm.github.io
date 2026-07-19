# iPadOS Development: Starter Template

A reusable starting point derived from the **3. Adaptive Navigation** section of [iPadOS Development](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```swift
NavigationSplitView {
    List(selection: $selection) { ForEach(folders) { f in Tag(f.name, value: f) } }
        .navigationTitle("Library")
} detail: {
    NavigationStack(path: $detailPath) {
        DetailView(folder: selection)
    }
}
.navigationSplitViewColumnWidth(for: .sidebar, ideal: 240, min: 180, max: 320)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
