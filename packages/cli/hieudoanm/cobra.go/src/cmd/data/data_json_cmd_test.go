package data

import (
	"encoding/json"
	"io"
	"os"
	"path/filepath"
	"strings"
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

func TestJSONDiffEdgeCases(t *testing.T) {
	dir := t.TempDir()
	f1 := filepath.Join(dir, "a.json")
	f2 := filepath.Join(dir, "b.json")

	write := func(path, content string) {
		if err := os.WriteFile(path, []byte(content), 0644); err != nil {
			t.Fatal(err)
		}
	}

	capture := func(fn func() error) (string, error) {
		old := os.Stdout
		r, w, _ := os.Pipe()
		os.Stdout = w
		err := fn()
		w.Close()
		os.Stdout = old
		out, _ := io.ReadAll(r)
		return string(out), err
	}

	t.Run("empty objects identical", func(t *testing.T) {
		write(f1, `{}`)
		write(f2, `{}`)
		out, err := capture(func() error { return jsonDiff(f1, f2) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if out != "" {
			t.Errorf("expected no output, got: %s", out)
		}
	})

	t.Run("empty vs non-empty", func(t *testing.T) {
		write(f1, `{}`)
		write(f2, `{"a":1}`)
		out, err := capture(func() error { return jsonDiff(f1, f2) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if out == "" {
			t.Error("expected output for differing files")
		}
		if !strings.Contains(out, "+") {
			t.Error("expected '+' lines in diff output")
		}
	})

	t.Run("array differences", func(t *testing.T) {
		write(f1, `[1,2,3]`)
		write(f2, `[1,2,4]`)
		out, err := capture(func() error { return jsonDiff(f1, f2) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if out == "" {
			t.Error("expected output for differing arrays")
		}
		if !strings.Contains(out, "-") || !strings.Contains(out, "+") {
			t.Error("expected both '-' and '+' in diff output")
		}
	})

	t.Run("deeply nested objects", func(t *testing.T) {
		write(f1, `{"a":{"b":{"c":1}}}`)
		write(f2, `{"a":{"b":{"c":2}}}`)
		out, err := capture(func() error { return jsonDiff(f1, f2) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if out == "" {
			t.Error("expected output for differing nested objects")
		}
	})

	t.Run("missing files", func(t *testing.T) {
		if err := jsonDiff("/nonexistent1", "/nonexistent2"); err == nil {
			t.Error("expected error for missing files")
		}
	})
}

func TestJSONMergeEdgeCases(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")

	write := func(path, content string) {
		if err := os.WriteFile(path, []byte(content), 0644); err != nil {
			t.Fatal(err)
		}
	}

	capture := func(fn func() error) (map[string]interface{}, error) {
		old := os.Stdout
		r, w, _ := os.Pipe()
		os.Stdout = w
		err := fn()
		w.Close()
		os.Stdout = old
		var result map[string]interface{}
		decodeErr := json.NewDecoder(r).Decode(&result)
		if decodeErr != nil {
			return nil, decodeErr
		}
		return result, err
	}

	t.Run("empty base", func(t *testing.T) {
		write(base, `{}`)
		write(patch, `{"a":1}`)
		result, err := capture(func() error { return jsonMerge(base, patch) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if result["a"] != float64(1) {
			t.Errorf("got %v, want a=1", result)
		}
	})

	t.Run("empty patch", func(t *testing.T) {
		write(base, `{"a":1}`)
		write(patch, `{}`)
		result, err := capture(func() error { return jsonMerge(base, patch) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if result["a"] != float64(1) {
			t.Errorf("got %v, want a=1", result)
		}
	})

	t.Run("conflicting key types", func(t *testing.T) {
		write(base, `{"a":1}`)
		write(patch, `{"a":"one"}`)
		result, err := capture(func() error { return jsonMerge(base, patch) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if result["a"] != "one" {
			t.Errorf("got %v, want a=\"one\"", result)
		}
	})

	t.Run("deep nesting replaced", func(t *testing.T) {
		write(base, `{"a":{"b":1,"c":2}}`)
		write(patch, `{"a":{"b":2}}`)
		result, err := capture(func() error { return jsonMerge(base, patch) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		// shallow merge: patch replaces "a" entirely
		nested, ok := result["a"].(map[string]interface{})
		if !ok {
			t.Fatalf("expected map for 'a', got %T", result["a"])
		}
		if nested["b"] != float64(2) {
			t.Errorf("b = %v, want 2", nested["b"])
		}
		if _, exists := nested["c"]; exists {
			t.Error("'c' should not exist after shallow replace")
		}
	})

	t.Run("nil merge (null value)", func(t *testing.T) {
		write(base, `{"a":1}`)
		write(patch, `{"a":null}`)
		result, err := capture(func() error { return jsonMerge(base, patch) })
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		if result["a"] != nil {
			t.Errorf("got %v, want nil for 'a'", result["a"])
		}
	})
}

func TestNewJsonCmdFlags(t *testing.T) {
	cmd := newJsonCmd()
	if cmd == nil {
		t.Fatal("newJsonCmd() returned nil")
	}

	expectedFlags := map[string]struct {
		short string
		long  string
	}{
		"query":  {short: "q", long: "query"},
		"diff":   {short: "", long: "diff"},
		"merge":  {short: "", long: "merge"},
		"pretty": {short: "p", long: "pretty"},
	}

	for name, expected := range expectedFlags {
		flag := cmd.Flag(name)
		if flag == nil {
			t.Errorf("missing flag: --%s", name)
			continue
		}
		if flag.Shorthand != expected.short {
			t.Errorf("flag %s shorthand = %q, want %q", name, flag.Shorthand, expected.short)
		}
	}
}

func TestNewJsonCmdMetadata(t *testing.T) {
	cmd := newJsonCmd()
	if cmd.Use != "json [file]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "json [file]")
	}
	if cmd.Short == "" {
		t.Error("Short description should not be empty")
	}
	if cmd.Long == "" {
		t.Error("Long description should not be empty")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
}

func TestNewJsonCmdArgs(t *testing.T) {
	cmd := newJsonCmd()
	if cmd.Args == nil {
		t.Fatal("expected Args validator")
	}
	if err := cmd.Args(cmd, []string{}); err != nil {
		t.Errorf("expected no error for 0 args, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"a.json"}); err != nil {
		t.Errorf("expected no error for 1 arg, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"a.json", "b.json"}); err != nil {
		t.Errorf("expected no error for 2 args, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"a", "b", "c"}); err == nil {
		t.Error("expected error for 3 args")
	}
}

func TestJsonCmdRunE_FileInput(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "data.json")
	if err := os.WriteFile(f, []byte(`{"name":"test"}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := newJsonCmd()
	cmd.SetArgs([]string{f})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "test") {
		t.Errorf("output should contain 'test', got: %s", string(out))
	}
}

func TestJsonCmdRunE_StdinInput(t *testing.T) {
	oldStdin := os.Stdin
	stdinR, stdinW, _ := os.Pipe()
	stdinW.Write([]byte(`{"name":"stdin_test"}`))
	stdinW.Close()
	os.Stdin = stdinR

	oldStdout := os.Stdout
	stdoutR, stdoutW, _ := os.Pipe()
	os.Stdout = stdoutW

	cmd := newJsonCmd()
	cmd.SetArgs([]string{})
	err := cmd.Execute()

	stdoutW.Close()
	os.Stdout = oldStdout
	os.Stdin = oldStdin

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(stdoutR)
	if !strings.Contains(string(out), "stdin_test") {
		t.Errorf("output should contain 'stdin_test', got: %s", string(out))
	}
}

func TestJsonCmdRunE_Query(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "data.json")
	if err := os.WriteFile(f, []byte(`{"name":"john","age":30}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := newJsonCmd()
	cmd.SetArgs([]string{f, "--query", ".name"})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "john") {
		t.Errorf("output should contain 'john', got: %s", string(out))
	}
}

func TestJsonCmdRunE_Diff(t *testing.T) {
	dir := t.TempDir()
	f1 := filepath.Join(dir, "a.json")
	f2 := filepath.Join(dir, "b.json")
	if err := os.WriteFile(f1, []byte(`{"a":1}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(f2, []byte(`{"a":2}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := newJsonCmd()
	cmd.SetArgs([]string{f1, "--diff", f2})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "a") {
		t.Errorf("output should contain diff, got: %s", string(out))
	}
}

func TestJsonCmdRunE_Merge(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")
	if err := os.WriteFile(base, []byte(`{"a":1}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(patch, []byte(`{"b":2}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := newJsonCmd()
	cmd.SetArgs([]string{base, "--merge", patch})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "1") || !strings.Contains(string(out), "2") {
		t.Errorf("output should contain merged values, got: %s", string(out))
	}
}

func TestJsonCmdRunE_InvalidJSON(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "bad.json")
	if err := os.WriteFile(f, []byte(`{invalid}`), 0644); err != nil {
		t.Fatal(err)
	}

	cmd := newJsonCmd()
	cmd.SetArgs([]string{f})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for invalid JSON")
	}
}

func TestJsonCmdRunE_MissingFile(t *testing.T) {
	cmd := newJsonCmd()
	cmd.SetArgs([]string{"/nonexistent/file.json"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for missing file")
	}
}

func TestJsonCmdRunE_QueryMissingKey(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "data.json")
	if err := os.WriteFile(f, []byte(`{"name":"test"}`), 0644); err != nil {
		t.Fatal(err)
	}

	cmd := newJsonCmd()
	cmd.SetArgs([]string{f, "--query", ".nonexistent"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for missing key in query")
	}
}
