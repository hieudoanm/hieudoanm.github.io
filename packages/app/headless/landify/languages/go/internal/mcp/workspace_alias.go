package mcp

import "landify/internal/workspace"

// The sandbox now lives in internal/workspace so the API server can share it
// without importing this package. These aliases keep the MCP tools and their
// tests reading the same names they always have.

// Workspace is the file access the MCP tools are allowed to perform.
type Workspace = workspace.Workspace

// DefaultRoot is the directory relative paths resolve against without --root.
const DefaultRoot = workspace.DefaultRoot

// DefaultConfigPath is the config file the tools read when none is named.
const DefaultConfigPath = workspace.DefaultConfigPath

// NewWorkspace returns a Workspace rooted at dir.
func NewWorkspace(dir string) (*Workspace, error) {
	return workspace.NewWorkspace(dir)
}
