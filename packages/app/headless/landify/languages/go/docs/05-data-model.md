# Data Model

Landify has no database and no persisted data model beyond the single
`landify.yaml` content file. The in-memory model is `landify.Config`, which
holds the shared sections (`site`, `theme`, `footer`) plus one struct per page
type (all `*T`, nil when absent). `Theme` is exactly eight base colors plus
`radius`; empty fields merge from `DefaultTheme()`.

The `Doc` model (used by the GUI and TUI editors) keeps the raw YAML plus a
decoded `landify.Config`, and every mutation rewrites the YAML through the
yaml.v3 node helpers while `Replace` round-trips raw editor text through parse
→ validate → re-serialize.
