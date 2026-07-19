# API Specification

Landify exposes two programmatic surfaces:

## CLI

Nine subcommands on the root Cobra command: `new`, `validate`, `build`,
`themes`, `preview`, `serve`, `tui`, `studio`, `mcp`. `--file` (`-f`) is a
persistent root flag; see the configuration table in [ARCHITECTURE]
(04-architecture.md).

## Model Context Protocol

`landify mcp serve` runs a hand-rolled JSON-RPC 2.0 server on stdio (newline-
delimited, no MCP SDK). Methods: `initialize`, `ping`, `tools/list`,
`tools/call`. Tools: `landify_scaffold`, `landify_validate`, `landify_build`,
`landify_types`, `landify_themes`, `landify_theme_tokens`. All file access is
confined to the `--root` workspace; absolute paths and `..` escapes are
rejected, not rewritten.
