package landify

import (
	"path/filepath"
	"strings"
	"testing"
)

// TestPlaceholderPerType ensures every known page type ships an embedded
// example that is legal: it must decode strictly and pass validation, so a
// freshly generated `landify.yaml` never starts its life invalid.
func TestPlaceholderPerType(t *testing.T) {
	for _, typ := range KnownTypes() {
		typ := typ
		t.Run(typ, func(t *testing.T) {
			path := filepath.Join(t.TempDir(), "landify.yaml")
			if err := WritePlaceholder(path, typ); err != nil {
				t.Fatalf("WritePlaceholder(%q) = %v, want nil", typ, err)
			}
			cfg, err := LoadFile(path)
			if err != nil {
				t.Fatalf("LoadFile(%q) = %v, want nil", typ, err)
			}
			if got := NormalizeType(cfg.Type); got != typ {
				t.Errorf("embedded example type = %q, want %q", got, typ)
			}
			if errs := Errors(cfg); len(errs) != 0 {
				t.Fatalf("embedded example for %q is invalid: %s", typ, strings.Join(errs, "; "))
			}
		})
	}
}

// TestWritePlaceholderUnknownType checks that the type rejection matches the
// validation message so `landify new -t nope` fails loudly and consistently.
func TestWritePlaceholderUnknownType(t *testing.T) {
	err := WritePlaceholder(filepath.Join(t.TempDir(), "landify.yaml"), "nope")
	if err == nil {
		t.Fatal("WritePlaceholder(unknown) error = nil, want an error")
	}
	if !strings.Contains(err.Error(), "type \"nope\" is not supported") {
		t.Errorf("error = %q, want the shared unknown-type message", err)
	}
}
