package gui

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"gopkg.in/yaml.v3"

	"landify/internal/landify"
	"landify/static"
)

// ErrNoPath is returned by Save when the document has no path yet; the caller
// should prompt for a location with "Save As" instead.
var ErrNoPath = errors.New("document has no path; use Save As")

// Doc is a single open landify.yaml document. The YAML text is the source of
// truth; Config and Issue are derived views kept in sync by refresh.
type Doc struct {
	Path string
	YAML string

	cfg   *landify.Config
	issue []string
}

// NewBlank returns a new unsaved document scaffolded as the default product
// layout, ready to edit.
func NewBlank() (*Doc, error) {
	yaml, err := ScaffoldYAML("")
	if err != nil {
		return nil, err
	}
	d := &Doc{}
	d.Replace(yaml)
	return d, nil
}

// NewFile loads the document at path.
func NewFile(path string) (*Doc, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", path, err)
	}
	d := &Doc{Path: path}
	d.Replace(string(data))
	return d, nil
}

// Name returns the file name, or "Untitled" for new documents.
func (d *Doc) Name() string {
	if d.Path == "" {
		return "Untitled"
	}
	return filepath.Base(d.Path)
}

// Replace sets the document YAML text and re-derives Config and issues.
func (d *Doc) Replace(yaml string) {
	d.YAML = yaml
	d.refresh()
}

// Refresh re-derives Config and issues from the current YAML text. The caller
// only needs it after editing field nodes directly behind Doc's back.
func (d *Doc) Refresh() {
	d.refresh()
}

func (d *Doc) refresh() {
	cfg, err := landify.Load([]byte(d.YAML))
	d.cfg = cfg
	d.issue = nil
	if err != nil {
		d.issue = []string{err.Error()}
		return
	}
	d.issue = append(d.issue, landify.Errors(cfg)...)
}

// Issues returns the complete problem list: parse errors first, then every
// schema error. An empty slice means the document is valid.
func (d *Doc) Issues() []string {
	return d.issue
}

// Valid reports whether the document parses and satisfies the schema.
func (d *Doc) Valid() bool {
	return len(d.issue) == 0
}

// Config returns the parsed config, or nil when the YAML cannot be parsed.
func (d *Doc) Config() *landify.Config {
	return d.cfg
}

// Type returns the normalized page type.
func (d *Doc) Type() string {
	if d.cfg == nil {
		return ""
	}
	return landify.NormalizeType(d.cfg.Type)
}

// HTML renders the current document. It fails when the YAML cannot be parsed
// or the theme is invalid; schema gaps are allowed so half-finished edits can
// still be previewed.
func (d *Doc) HTML() (string, error) {
	if d.cfg == nil {
		return "", errors.New("cannot render: YAML does not parse")
	}
	out, err := landify.Render(d.cfg)
	if err != nil {
		return "", err
	}
	return string(out), nil
}

// ApplyType replaces the document with the annotated scaffold for typ, the
// same content `landify new -t <typ>` writes.
func (d *Doc) ApplyType(typ string) error {
	yaml, err := ScaffoldYAML(typ)
	if err != nil {
		return err
	}
	d.Replace(yaml)
	return nil
}

// SetTheme re-serializes the document with cfg.Theme replaced by theme.
func (d *Doc) SetTheme(theme landify.Theme) (string, error) {
	if d.cfg == nil {
		return "", errors.New("cannot edit theme: YAML does not parse")
	}
	cfg := *d.cfg
	cfg.Theme = theme
	out, err := MarshalYAML(&cfg)
	if err != nil {
		return "", err
	}
	d.Replace(out)
	return out, nil
}

// Save writes the document back to d.Path.
func (d *Doc) Save() error {
	if d.Path == "" {
		return ErrNoPath
	}
	return SaveYAML(d.Path, d.YAML)
}

// SaveAs writes the document to path and adopts it as the new Path.
func (d *Doc) SaveAs(path string) error {
	if err := SaveYAML(path, d.YAML); err != nil {
		return err
	}
	d.Path = path
	return nil
}

// Build renders the page and writes it to output (creating parent
// directories), bypassing schema validation so WIP documents build too.
func (d *Doc) Build(output string) error {
	if d.cfg == nil {
		return errors.New("cannot build: YAML does not parse")
	}
	html, err := landify.Render(d.cfg)
	if err != nil {
		return err
	}
	dir := filepath.Dir(output)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return fmt.Errorf("create %s: %w", dir, err)
		}
	}
	if err := os.WriteFile(output, html, 0o644); err != nil {
		return fmt.Errorf("write %s: %w", output, err)
	}
	return nil
}

// ScaffoldYAML returns the annotated placeholder content for typ ("" maps to
// the product default), the same file `landify new -t` writes.
func ScaffoldYAML(typ string) (string, error) {
	typ = landify.NormalizeType(typ)
	if !isKnownContentType(typ) {
		return "", fmt.Errorf("type %q is not supported (available: %s)", typ, strings.Join(landify.KnownTypes(), ", "))
	}
	data, err := static.FS.ReadFile("examples/example-" + typ + ".yaml")
	if err != nil {
		return "", fmt.Errorf("read example: %w", err)
	}
	return strings.TrimSuffix(string(data), "\n"), nil
}

func isKnownContentType(typ string) bool {
	for _, t := range landify.KnownTypes() {
		if t == typ {
			return true
		}
	}
	return false
}

// MarshalYAML encodes a config back to YAML text.
func MarshalYAML(cfg *landify.Config) (string, error) {
	var buf bytes.Buffer
	enc := yaml.NewEncoder(&buf)
	enc.SetIndent(2)
	if err := enc.Encode(cfg); err != nil {
		return "", fmt.Errorf("marshal yaml: %w", err)
	}
	if err := enc.Close(); err != nil {
		return "", err
	}
	return buf.String(), nil
}

// SaveYAML writes data to path, creating parent directories as needed.
func SaveYAML(path, data string) error {
	dir := filepath.Dir(path)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return fmt.Errorf("create %s: %w", dir, err)
		}
	}
	if err := os.WriteFile(path, []byte(data), 0o644); err != nil {
		return fmt.Errorf("write %s: %w", path, err)
	}
	return nil
}
