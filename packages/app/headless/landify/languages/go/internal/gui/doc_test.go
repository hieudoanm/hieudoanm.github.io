package gui

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"landify/internal/landify"
)

func TestNewBlank(t *testing.T) {
	doc, err := NewBlank()
	if err != nil {
		t.Fatal(err)
	}
	if doc.Path != "" {
		t.Fatalf("expected empty path, got %s", doc.Path)
	}
	if doc.Name() != "Untitled" {
		t.Fatalf("expected Untitled, got %s", doc.Name())
	}
	if !doc.Valid() {
		t.Fatalf("blank document should be valid, got issues: %s", doc.Issues())
	}
	if doc.Type() != "product" {
		t.Fatalf("expected product type, got %s", doc.Type())
	}
	if !strings.Contains(doc.YAML, "type: product") {
		t.Fatal("scaffold should contain type: product")
	}
}

func TestNewFile(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "site.yaml")
	scaffold, err := ScaffoldYAML("")
	if err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte(scaffold), 0o644); err != nil {
		t.Fatal(err)
	}
	doc, err := NewFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if doc.Path != path {
		t.Fatalf("expected path %s, got %s", path, doc.Path)
	}
	if doc.Name() != "site.yaml" {
		t.Fatalf("expected site.yaml, got %s", doc.Name())
	}
	if !doc.Valid() {
		t.Fatalf("loaded scaffold should be valid, got: %s", doc.Issues())
	}
}

func TestNewFileMissing(t *testing.T) {
	_, err := NewFile("/nonexistent/file.yaml")
	if err == nil {
		t.Fatal("expected error for missing file")
	}
}

func TestReplaceAndIssues(t *testing.T) {
	doc, _ := NewBlank()
	doc.Replace(`type: product
site:
  name: Test
  description: ok
  nav:
    - label: Home
      href: /
hero:
  headline: Hi
  subheadline: there
  primary:
    label: Go
    href: /
  image:
    src: hero.png
demo:
  video:
    src: demo.mp4
features:
  items:
    - title: A
      body: B
cta:
  heading: CT
  body: CB
  button:
    label: Go
    href: /
footer:
  copyright: Test 2024
theme:
  base: "#ffffff"
  primary: "#000000"
  secondary: "#111111"
  neutral: "#222222"
  info: "#333333"
  warning: "#444444"
  success: "#555555"
  error: "#666666"
  radius: "8px"`)
	if !doc.Valid() {
		t.Fatalf("expected valid, got: %s", doc.Issues())
	}

	doc.Replace("type: invalid")
	if doc.Valid() {
		t.Fatal("expected invalid document")
	}
	if len(doc.Issues()) == 0 {
		t.Fatal("expected at least one issue")
	}
}

func TestDocHTML(t *testing.T) {
	doc, err := NewBlank()
	if err != nil {
		t.Fatal(err)
	}
	html, err := doc.HTML()
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(html, "<html") {
		t.Fatalf("HTML should contain <html, got first 80 bytes: %s", html[:80])
	}
}

func TestDocApplyType(t *testing.T) {
	doc, _ := NewBlank()
	if err := doc.ApplyType("event"); err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(doc.YAML, "type: event") {
		t.Fatal("scaffold should set type: event")
	}
}

func TestDocSetTheme(t *testing.T) {
	doc, _ := NewBlank()
	th := landify.DefaultTheme()
	th.Primary = "#ff0000"
	newYAML, err := doc.SetTheme(th)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(newYAML, "#ff0000") {
		t.Fatal("YAML should contain new primary color")
	}
	if doc.cfg.Theme.Primary != "#ff0000" {
		t.Fatalf("expected #ff0000, got %s", doc.cfg.Theme.Primary)
	}
	if !doc.Valid() {
		t.Fatalf("document should remain valid, got: %s", doc.Issues())
	}
}

func TestDocBuildAndSave(t *testing.T) {
	doc, _ := NewBlank()
	dir := t.TempDir()

	// Build
	htmlOut := filepath.Join(dir, "out", "index.html")
	if err := doc.Build(htmlOut); err != nil {
		t.Fatal(err)
	}
	data, err := os.ReadFile(htmlOut)
	if err != nil {
		t.Fatal(err)
	}
	if len(data) == 0 {
		t.Fatal("output file should not be empty")
	}

	// Save
	yamlOut := filepath.Join(dir, "saved.yaml")
	if err := doc.SaveAs(yamlOut); err != nil {
		t.Fatal(err)
	}
	if doc.Path != yamlOut {
		t.Fatalf("expected path %s, got %s", yamlOut, doc.Path)
	}

	// Save without path
	doc2, _ := NewBlank()
	if err := doc2.Save(); !errors.Is(err, ErrNoPath) {
		t.Fatalf("expected ErrNoPath, got %v", err)
	}
}

func TestScaffoldYAML(t *testing.T) {
	data, err := ScaffoldYAML("")
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(data, "type: product") {
		t.Fatal("blank scaffold should be product")
	}

	_, err = ScaffoldYAML("unknown_type")
	if err == nil {
		t.Fatal("expected error for unknown type")
	}
}

func TestMarshalYAML(t *testing.T) {
	th := landify.Theme{Base: "#aabbcc", Primary: "#112233", Secondary: "#445566",
		Neutral: "#778899", Info: "#aaa", Warning: "#bbb", Success: "#ccc", Error: "#ddd", Radius: "5px"}
	data, err := MarshalYAML(&landify.Config{Theme: th})
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(data, "#aabbcc") {
		t.Fatal("marshalled YAML should contain base color")
	}
}
