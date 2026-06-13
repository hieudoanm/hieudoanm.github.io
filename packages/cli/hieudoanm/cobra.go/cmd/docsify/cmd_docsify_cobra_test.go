package docsify

import (
	"go/ast"
	"go/parser"
	"go/token"
	"testing"
)

func parseCmdLit(t *testing.T, src string) *ast.CompositeLit {
	t.Helper()
	fset := token.NewFileSet()
	f, err := parser.ParseFile(fset, "test.go", src, parser.ParseComments)
	if err != nil {
		t.Fatal(err)
	}

	var lit *ast.CompositeLit
	ast.Inspect(f, func(n ast.Node) bool {
		if cl, ok := n.(*ast.CompositeLit); ok {
			lit = cl
			return false
		}
		return true
	})

	if lit == nil {
		t.Fatal("no CompositeLit found in source")
	}
	return lit
}

func TestGetStringField(t *testing.T) {
	src := `package p
var cmd = &cobra.Command{
	Use: "hello",
	Short: "A short description",
	Long: "A long description",
	Example: "hello world",
}`
	lit := parseCmdLit(t, src)

	tests := []struct {
		field    string
		expected string
	}{
		{"Use", "hello"},
		{"Short", "A short description"},
		{"Long", "A long description"},
		{"Example", "hello world"},
		{"NonExistent", ""},
	}
	for _, tc := range tests {
		got := getStringField(lit, tc.field)
		if got != tc.expected {
			t.Errorf("getStringField(lit, %q) = %q, want %q", tc.field, got, tc.expected)
		}
	}
}

func TestGetStringField_missingField(t *testing.T) {
	src := `package p
var cmd = &cobra.Command{
	Use: "hello",
}`
	lit := parseCmdLit(t, src)
	got := getStringField(lit, "Missing")
	if got != "" {
		t.Errorf("expected empty string for missing field, got %q", got)
	}
}

func TestGetStringField_backtickString(t *testing.T) {
	src := "package p\nvar cmd = &cobra.Command{\n\tUse: `hello-world`,\n}"
	lit := parseCmdLit(t, src)
	got := getStringField(lit, "Use")
	if got != "hello-world" {
		t.Errorf("expected %q, got %q", "hello-world", got)
	}
}

func TestExtractCmd(t *testing.T) {
	src := `package p
var cmd = &cobra.Command{
	Use: "test-cmd",
	Short: "short",
	Long: "longer description",
	Example: "test-cmd --flag value",
}`
	lit := parseCmdLit(t, src)
	doc := extractCmd(lit)

	if doc.FullName != "test-cmd" {
		t.Errorf("FullName = %q, want %q", doc.FullName, "test-cmd")
	}
	if doc.Short != "short" {
		t.Errorf("Short = %q, want %q", doc.Short, "short")
	}
	if doc.Long != "longer description" {
		t.Errorf("Long = %q, want %q", doc.Long, "longer description")
	}
	if doc.Example != "test-cmd --flag value" {
		t.Errorf("Example = %q, want %q", doc.Example, "test-cmd --flag value")
	}
}

func TestGetStringField_nonStringValue(t *testing.T) {
	src := `package p
var cmd = &cobra.Command{
	Use: "app",
	Args: cobra.ExactArgs(1),
}`
	lit := parseCmdLit(t, src)
	got := getStringField(lit, "Args")
	// getStringField returns the first arg of a CallExpr if it's a BasicLit
	// cobra.ExactArgs(1) → "1"
	if got != "1" {
		t.Errorf("expected %q, got %q", "1", got)
	}
}

func TestGetStringField_funcCallValue(t *testing.T) {
	src := `package p
var cmd = &cobra.Command{
	Use: "app",
	Short: fmt.Sprintf("hello %s", "world"),
}`
	lit := parseCmdLit(t, src)
	got := getStringField(lit, "Short")
	if got != "hello %s" {
		t.Errorf("expected %q, got %q", "hello %s", got)
	}
}
