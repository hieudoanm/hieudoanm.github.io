# Bubble Tea Design Best Practices: Workflow Checklist

A practical run sheet for applying [Bubble Tea Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: github.com/charmbracelet/bubbletea — app loop (Model/Update/View)
- [ ] 1. Core Stack: github.com/charmbracelet/lipgloss — styling (color, borders, padding, layout)
- [ ] 2. Color Palette: Always use AdaptiveColor (or check lipgloss.HasDarkBackground()) — never assume the user's terminal background
- [ ] 2. Color Palette: One primary/accent color max; everything else neutral grays
- [ ] 4. Borders & Containers: Use lipgloss.RoundedBorder() for a modern feel; lipgloss.NormalBorder() for a denser/technical feel. Pick one and use it consistently app-wide
- [ ] 4. Borders & Containers: Group related content in a bordered box rather than relying on blank-line separation alone
- [ ] 6. Layout Patterns: **Full-screen apps:** compute available height/width from tea.WindowSizeMsg and re-layout on resize — never hardcode terminal dimensions
- [ ] 6. Layout Patterns: **Status/help bar:** pin a single-line footer (via bubbles/help or a custom styled line) showing key bindings — keeps the UI discoverable without cluttering the main view
- [ ] 7. Key Bindings & Discoverability: Use bubbles/key to define bindings with a Help() method — this auto-populates a help view instead of a static hardcoded string
- [ ] 7. Key Bindings & Discoverability: Always support q / ctrl+c to quit, ? to toggle help, and arrow keys + vim-style j/k for navigation where lists are involved

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
