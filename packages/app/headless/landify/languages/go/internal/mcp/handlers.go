package mcp

import (
	"encoding/json"
	"fmt"

	"landify/internal/landify"
)

// scaffoldResult is the payload of the scaffold tool.
type scaffoldResult struct {
	Type    string `json:"type"`
	Written string `json:"written,omitempty"`
	YAML    string `json:"yaml"`
}

// validateResult is the payload of the validate tool.
type validateResult struct {
	Valid  bool     `json:"valid"`
	Type   string   `json:"type"`
	Source string   `json:"source"`
	Errors []string `json:"errors"`
}

// scaffoldArgs are the arguments of the scaffold tool.
type scaffoldArgs struct {
	Type      string `json:"type"`
	Path      string `json:"path"`
	Overwrite bool   `json:"overwrite"`
}

// handleScaffold returns a starter config for a page type and, when the caller
// names a path, writes it there. Overwriting is opt-in so a model cannot
// silently destroy a config the user is editing.
func handleScaffold(ws *Workspace) ToolHandler {
	return func(raw json.RawMessage) *ToolResult {
		var args scaffoldArgs
		if err := unmarshalArgs(raw, &args); err != nil {
			return NewToolResultError(err.Error())
		}
		if err := requireNonBlank("type", args.Type); err != nil {
			return NewToolResultError(err.Error())
		}

		kind := landify.NormalizeType(args.Type)
		yaml, err := landify.Placeholder(kind)
		if err != nil {
			return NewToolResultError(fmt.Sprintf("type %q is not supported: %v", args.Type, err))
		}

		written, err := writeUnlessPresent(ws, args.Path, yaml, args.Overwrite)
		if err != nil {
			return NewToolResultError(err.Error())
		}
		return NewToolResultText(marshal(scaffoldResult{Type: kind, Written: written, YAML: string(yaml)}))
	}
}

// writeUnlessPresent writes data to path inside the root, creating parent
// directories, and returns the path it wrote. A blank path writes nothing and
// returns "", because "show me the yaml" is the common case for a model that
// only wants to read the starter config.
func writeUnlessPresent(ws *Workspace, path string, data []byte, overwrite bool) (string, error) {
	if path == "" {
		return "", nil
	}
	if !overwrite {
		exists, err := ws.Exists(path)
		if err != nil {
			return "", err
		}
		if exists {
			return "", fmt.Errorf("%s already exists; pass overwrite to replace it", path)
		}
	}
	if err := ws.Write(path, data); err != nil {
		return "", err
	}
	return path, nil
}

// handleValidate schema-checks a config and reports every problem at once, so a
// model can fix a draft in one pass instead of discovering fields one at a
// time. A parse failure is a tool error; a schema failure is a normal result.
func handleValidate(ws *Workspace) ToolHandler {
	return func(raw json.RawMessage) *ToolResult {
		var args sourceArgs
		if err := unmarshalArgs(raw, &args); err != nil {
			return NewToolResultError(err.Error())
		}
		source, err := resolve(ws, args)
		if err != nil {
			return NewToolResultError(err.Error())
		}

		errs := landify.Errors(source.cfg)
		return NewToolResultText(marshal(validateResult{
			Valid:  len(errs) == 0,
			Type:   landify.NormalizeType(source.cfg.Type),
			Source: source.origin,
			Errors: nonNil(errs),
		}))
	}
}

// nonNil replaces a nil slice with an empty one. A model reading the result
// should always find a list to iterate, never a JSON null.
func nonNil(values []string) []string {
	if values == nil {
		return []string{}
	}
	return values
}

// marshal renders a tool payload as indented JSON. Every text block goes
// through this rather than fmt.Sprintf so quotes and newlines in user content
// cannot corrupt the JSON a model has to parse.
func marshal(payload any) string {
	data, err := json.MarshalIndent(payload, "", "  ")
	if err != nil {
		return fmt.Sprintf("could not encode result: %v", err)
	}
	return string(data)
}
