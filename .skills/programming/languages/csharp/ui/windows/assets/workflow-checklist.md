# Windows App Development: Workflow Checklist

A practical run sheet for applying [Windows App Development](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Choosing the Stack: **New app: WinUI 3 via Windows App SDK.** It is the only Microsoft first-party desktop stack that is getting new platform features, and it is the one Microsoft designs against
- [ ] 1. Choosing the Stack: **Existing WPF or Windows Forms app: keep it.** Both are fully supported and run on .NET. Adopt the Windows App SDK for the platform features you need — windowing, notifications, DPI, app lifecycle — without rewriting the UI. A rewrite is a multi-quarter risk that is almost never justified on its own
- [ ] 2. Version & Targeting: **Three release channels**: stable, preview, experimental. Ship stable. Preview APIs change before they land in stable; experimental APIs can be removed outright
- [ ] 2. Version & Targeting: **Windows App SDK 2.0 introduced semantic versioning**, so minor bumps are additive. On 1.x they were not — a 1.7 → 1.8 upgrade could break your XAML. If you are still on 1.x, plan the 2.x move deliberately
- [ ] 3. Architecture: **Four layers, dependencies pointing down only:** Views (XAML + code-behind, no business logic) → ViewModels (commands, presentation state) → Services (business rules, orchestration) → Repositories (data access, caching)
- [ ] 3. Architecture: **A ViewModel must never reference a UI type** — no Page, Window, ContentDialog, or DispatcherQueue. That single rule is what makes the layer testable without a window
- [ ] 4. MVVM: **Use CommunityToolkit.Mvvm.** ObservableObject plus the [ObservableProperty] and [RelayCommand] source generators replace the hand-written INotifyPropertyChanged and ICommand boilerplate, and because generation is compile-time there is no reflection cost
- [ ] 4. MVVM: **ICommand has real per-instance overhead** — the CanExecuteChanged listener plus allocations on every binding. For a list with hundreds of rows, prefer code-behind event handlers that call methods on the view model, and manage IsEnabled yourself
- [ ] 5. XAML & Performance: **Use x:Bind, not {Binding}.** {Binding} resolves through reflection and boxing at runtime and allocates on every update; x:Bind is compiled at build time, so a renamed property is a compile error instead of a silent empty field
- [ ] 5. XAML & Performance: **x:Bind does not update automatically when a source property changes** unless you pass Mode=OneWay explicitly for non-INotifyPropertyChanged sources, or use x:Bind with a one-way path from an observable property. This is a feature, not a bug — it makes the data flow visible

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
