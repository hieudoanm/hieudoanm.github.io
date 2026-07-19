# SwiftUI Best Practices: Workflow Checklist

A practical run sheet for applying [SwiftUI Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. State & Data Flow: **@State for local ephemeral view state; @Binding for child↔parent channels**:
- [ ] 1. State & Data Flow: **@StateObject/@ObservedObject (Combine) or @State + @Observable (Observation) for model data** — one owner, shared by reference via bindings/@Environment:
- [ ] 2. View Composition: **Small reusable View structs over monolithic bodies** — a body beyond ~40 lines is a refactor signal; extract Card, Row, EmptyState:
- [ ] 2. View Composition: **@ViewBuilder for conditional content; compose with calls, not switch storms.**
- [ ] 3. Layout & Modifiers: **Stacks compose layout**: HStack/VStack/ZStack with alignment and spacing — no hardcoded frame guesswork:
- [ ] 3. Layout & Modifiers: **Spacer/Frame/GeometryReader deliberate** — GeometryReader as the last resort for proportional chrome
- [ ] 4. Lists & Scrollable Content: **List for dynamic, selectable content; ForEach for item maps** — data-driven, diffable:
- [ ] 4. Lists & Scrollable Content: **LazyVStack/LazyVGrid inside ScrollView for custom lazy layouts**; Section for grouped headings
- [ ] 5. Navigation: **NavigationStack + navigationDestination by value over NavigationView+path string hacks**:
- [ ] 5. Navigation: **Type-safe destinations** — navigation is driven by model values, not URLs or opaque identifiers

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
