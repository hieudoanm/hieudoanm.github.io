package data

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
)

func TestJSONQuery(t *testing.T) {
	data := map[string]interface{}{
		"name": "test",
		"nested": map[string]interface{}{
			"key": "value",
		},
		"items": []interface{}{
			map[string]interface{}{"id": 1},
			map[string]interface{}{"id": 2},
		},
	}

	tests := []struct {
		name  string
		query string
		want  interface{}
	}{
		{"root key", ".name", "test"},
		{"nested key", ".nested.key", "value"},
		{"array item", ".items[0].id", 1},
		{"second array item", ".items[1].id", 2},
	}
	for _, tt := range tests {
		got, err := jsonQuery(data, tt.query)
		if err != nil {
			t.Errorf("%s: unexpected error: %v", tt.name, err)
			continue
		}
		if got != tt.want {
			t.Errorf("%s: got %v (%T), want %v (%T)", tt.name, got, got, tt.want, tt.want)
		}
	}
}

func TestJSONQueryErrors(t *testing.T) {
	data := map[string]interface{}{
		"name": "test",
	}
	tests := []struct {
		name  string
		query string
	}{
		{"missing key", ".missing"},
		{"not an object on array", ".name[0]"},
	}
	for _, tt := range tests {
		_, err := jsonQuery(data, tt.query)
		if err == nil {
			t.Errorf("%s: expected error", tt.name)
		}
	}
}

func TestJSONDiff(t *testing.T) {
	dir := t.TempDir()
	f1 := filepath.Join(dir, "a.json")
	f2 := filepath.Join(dir, "b.json")

	write := func(path, content string) {
		if err := os.WriteFile(path, []byte(content), 0644); err != nil {
			t.Fatal(err)
		}
	}

	t.Run("identical", func(t *testing.T) {
		write(f1, `{"a":1}`)
		write(f2, `{"a":1}`)
		if err := jsonDiff(f1, f2); err != nil {
			t.Errorf("expected no error: %v", err)
		}
	})

	t.Run("one file missing", func(t *testing.T) {
		if err := jsonDiff("/nonexistent", f2); err == nil {
			t.Error("expected error for missing file")
		}
	})
}

func TestJSONMerge(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")

	write := func(path, content string) {
		if err := os.WriteFile(path, []byte(content), 0644); err != nil {
			t.Fatal(err)
		}
	}

	write(base, `{"a":1,"b":2}`)
	write(patch, `{"b":3,"c":4}`)

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	if err := jsonMerge(base, patch); err != nil {
		os.Stdout = old
		t.Fatalf("unexpected error: %v", err)
	}

	w.Close()
	os.Stdout = old

	var result map[string]interface{}
	if err := json.NewDecoder(r).Decode(&result); err != nil {
		t.Fatalf("decode output: %v", err)
	}
	if result["a"] != float64(1) || result["b"] != float64(3) || result["c"] != float64(4) {
		t.Errorf("got %v, want {a:1, b:3, c:4}", result)
	}
}

func TestJSONMergeError(t *testing.T) {
	if err := jsonMerge("/nonexistent", "/nonexistent2"); err == nil {
		t.Error("expected error for missing file")
	}
}

func TestNewJsonCmd(t *testing.T) {
	cmd := newJsonCmd()
	if cmd == nil {
		t.Fatal("newJsonCmd() returned nil")
	}
	if cmd.Use != "json [file]" {
		t.Errorf("Use = %q", cmd.Use)
	}
}
