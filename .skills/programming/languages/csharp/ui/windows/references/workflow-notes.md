# Workflow notes

Focused reference for **windows-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Architecture

- **Four layers, dependencies pointing down only:** Views (XAML + code-behind, no business logic) → ViewModels (commands, presentation state) → Services (business rules, orchestration) → Repositories (data access, caching).
- **A ViewModel must never reference a UI type** — no `Page`, `Window`, `ContentDialog`, or `DispatcherQueue`. That single rule is what makes the layer testable without a window.
- **Put ViewModels and Services in a separate class library** so the test project can reference them without pulling in the WinUI project. A test project that references a WinUI app project inherits its build complexity for no benefit.
- **WinUI 3 has no built-in DI container.** Add `Microsoft.Extensions.DependencyInjection` and `Microsoft.Extensions.Hosting`, build the host in `App.xaml.cs`, and resolve through a small `App.GetService<T>()` helper.
- **Fail loudly on an unregistered service.** The standard helper throws with the missing type name; do not return `null` and let a `NullReferenceException` surface three pages later.
- **Verify every registration by navigating to every page** during development. DI failures in WinUI are runtime, not build-time, so nothing else will catch them.
- **Version and migrate your local store at startup.** Desktop apps live for years; a settings file or SQLite schema with a version and an ordered migration chain is not optional.

---

## 4. MVVM

- **Use `CommunityToolkit.Mvvm`.** `ObservableObject` plus the `[ObservableProperty]` and `[RelayCommand]` source generators replace the hand-written `INotifyPropertyChanged` and `ICommand` boilerplate, and because generation is compile-time there is no reflection cost.
- **`ICommand` has real per-instance overhead** — the `CanExecuteChanged` listener plus allocations on every binding. For a list with hundreds of rows, prefer code-behind event handlers that call methods on the view model, and manage `IsEnabled` yourself.
- **`Messenger` is for cross-cutting notifications**, not for parent-to-child data. Anything that looks like a message is usually a missing abstraction.
- **Model loading, error, and empty as distinct states**, not an ad-hoc nullable. `ContentDialog` for errors belongs in the view, driven by a property the view model sets.

```csharp
public partial class NotesViewModel : ObservableObject
{
    [ObservableProperty] private string _query = string.Empty;
    [ObservableProperty] private bool _isLoading;
    [ObservableProperty] private string? _error;

    private readonly INotesRepository _repo;

    public NotesViewModel(INotesRepository repo) => _repo = repo;

    [RelayCommand]
    private async Task SearchAsync(CancellationToken ct)
    {
        IsLoading = true;
        Error = null;
        try { Results = await _repo.SearchAsync(Query, ct); }
        catch (OperationCanceledException) { throw; }
        catch (Exception ex) { Error = ex.Message; }
        finally { IsLoading = false; }
    }
}
```

---

## 5. XAML & Performance

- **Use `x:Bind`, not `{Binding}`.** `{Binding}` resolves through reflection and boxing at runtime and allocates on every update; `x:Bind` is compiled at build time, so a renamed property is a compile error instead of a silent empty field.
- **`x:Bind` does not update automatically when a source property changes** unless you pass `Mode=OneWay` explicitly for non-`INotifyPropertyChanged` sources, or use `x:Bind` with a one-way path from an observable property. This is a feature, not a bug — it makes the data flow visible.
- **`x:Load="False"` defers a control out of the startup tree.** Use it for anything that is often not visible.
- **Split page modes into separate `UserControl`s** instead of binding `Visibility` to toggle one big tree. A collapsed tree is still constructed, parsed, and in the working set.
- **Backdrops: `MicaBackdrop` for the window, `AcrylicBackdrop` only for transient surfaces.** Both adapt to theme and are cheap; a hand-rolled blur is neither.
- **Custom title bars go through `AppWindow` / `ExtendsContentIntoTitleBar`**, not a Win32 `HWND` hack. Same for multi-window and window placement.
- **Do not block the UI thread.** Everything off it goes to a `Task`, and every one takes a `CancellationToken`. WinUI enforces the UI thread; it does not stop you from starving it.

---

## 6. Packaging & Distribution
