package mcp

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"landify/internal/landify"
)

// sourceArgs is the "where does the config come from" pair shared by the
// validate, build and theme-tokens tools. A caller passes yaml for content it
// just composed, or path for a file in the server root. With neither, the
// tools fall back to the CLI's default config file.
type sourceArgs struct {
	YAML string `json:"yaml"`
	Path string `json:"path"`
}

// configSource is a resolved config plus a human-readable label for where it
// came from, which every tool result echoes back so a model can tell an inline
// draft from a file on disk.
type configSource struct {
	cfg    *landify.Config
	origin string
}

// resolve reads the config described by args. Both yaml and path set is an
// error: the two would silently disagree about which content wins.
func resolve(ws *Workspace, args sourceArgs) (configSource, error) {
	switch {
	case strings.TrimSpace(args.YAML) != "" && strings.TrimSpace(args.Path) != "":
		return configSource{}, errors.New("pass either yaml or path, not both")
	case strings.TrimSpace(args.YAML) != "":
		cfg, err := landify.Load([]byte(args.YAML))
		if err != nil {
			return configSource{}, fmt.Errorf("parse yaml: %w", err)
		}
		return configSource{cfg: cfg, origin: "inline"}, nil
	}

	path := strings.TrimSpace(args.Path)
	if path == "" {
		path = DefaultConfigPath
	}
	data, err := ws.Read(path)
	if err != nil {
		return configSource{}, err
	}
	cfg, err := landify.Load(data)
	if err != nil {
		return configSource{}, fmt.Errorf("parse %s: %w", path, err)
	}
	return configSource{cfg: cfg, origin: path}, nil
}

// unmarshalArgs deserialises raw into dst, treating a missing or null argument
// object as empty so a tool with no required properties can be called with no
// arguments at all. MCP clients typically send {}, not null.
func unmarshalArgs(raw json.RawMessage, dst any) error {
	if len(raw) == 0 || bytes.Equal(raw, []byte("null")) {
		raw = json.RawMessage("{}")
	}
	if err := json.Unmarshal(raw, dst); err != nil {
		return fmt.Errorf("invalid arguments: %w", err)
	}
	return nil
}

// requireNonBlank rejects a missing or blank value. Without it a client that
// omits a required argument would silently operate on "", which no tool wants.
func requireNonBlank(name, value string) error {
	if strings.TrimSpace(value) == "" {
		return fmt.Errorf("%s is required and must not be blank", name)
	}
	return nil
}
