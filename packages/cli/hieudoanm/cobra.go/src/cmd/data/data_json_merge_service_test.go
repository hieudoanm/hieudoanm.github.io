package data

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
)

func TestJsonMerge_PatchMissing(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")

	if err := os.WriteFile(base, []byte(`{"a":1}`), 0644); err != nil {
		t.Fatal(err)
	}

	if err := jsonMerge(base, "/nonexistent/patch.json"); err == nil {
		t.Error("expected error when patch file is missing")
	}
}

func TestJsonMerge_InvalidBaseJSON(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")

	if err := os.WriteFile(base, []byte(`{invalid}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(patch, []byte(`{"a":1}`), 0644); err != nil {
		t.Fatal(err)
	}

	if err := jsonMerge(base, patch); err == nil {
		t.Error("expected error for invalid base JSON")
	}
}

func TestJsonMerge_InvalidPatchJSON(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")

	if err := os.WriteFile(base, []byte(`{"a":1}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(patch, []byte(`{invalid}`), 0644); err != nil {
		t.Fatal(err)
	}

	if err := jsonMerge(base, patch); err == nil {
		t.Error("expected error for invalid patch JSON")
	}
}

func TestJsonMerge_EmptyObjects(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")

	if err := os.WriteFile(base, []byte(`{}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(patch, []byte(`{}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	err := jsonMerge(base, patch)

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	var result map[string]interface{}
	if decodeErr := json.NewDecoder(r).Decode(&result); decodeErr != nil {
		t.Fatalf("decode output: %v", decodeErr)
	}
	if len(result) != 0 {
		t.Errorf("expected empty result, got %v", result)
	}
}

func TestJsonMerge_ConflictingKeys(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")

	if err := os.WriteFile(base, []byte(`{"a":1,"b":2}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(patch, []byte(`{"b":3,"c":4}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	err := jsonMerge(base, patch)

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	var result map[string]interface{}
	if decodeErr := json.NewDecoder(r).Decode(&result); decodeErr != nil {
		t.Fatalf("decode output: %v", decodeErr)
	}
	if result["a"] != float64(1) {
		t.Errorf("a = %v, want 1", result["a"])
	}
	if result["b"] != float64(3) {
		t.Errorf("b = %v, want 3 (patch should override)", result["b"])
	}
	if result["c"] != float64(4) {
		t.Errorf("c = %v, want 4", result["c"])
	}
}

func TestJsonMerge_NestedMerge(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")

	if err := os.WriteFile(base, []byte(`{"a":{"b":1,"c":2},"d":3}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(patch, []byte(`{"a":{"b":10}}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	err := jsonMerge(base, patch)

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	var result map[string]interface{}
	if decodeErr := json.NewDecoder(r).Decode(&result); decodeErr != nil {
		t.Fatalf("decode output: %v", decodeErr)
	}
	if result["d"] != float64(3) {
		t.Errorf("d = %v, want 3", result["d"])
	}
}
