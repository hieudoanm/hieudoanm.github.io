# Risk Mitigation

| Risk                              | Mitigation                                                    |
| --------------------------------- | ------------------------------------------------------------- |
| Unknown YAML fields slip through  | `yaml.Decoder` with `KnownFields(true)` rejects them          |
| Studio pulls fyne into CI/tests   | `gui.go` stub behind `//go:build !gui`; pure logic fyne-free  |
| MCP escapes workspace root        | Root canonicalised once; symlinks resolved before containment |
| Bad render path fails late        | `handleBuild` resolves `output` before rendering              |
| Half-baked page on invalid config | Validation runs before render; `build`/`validate` exit 1      |
