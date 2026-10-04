package cmd

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/spf13/cobra"
)

// run executes the pagify command tree with args, capturing stdout.
func run(t *testing.T, args ...string) (stdout, stderr string, err error) {
	t.Helper()
	var out, errOut bytes.Buffer

	root := NewRootCommand(&out, &errOut)
	root.SetArgs(args)
	err = root.Execute()
	return out.String(), errOut.String(), err
}

func TestRootShowsHelpAndVersion(t *testing.T) {
	stdout, _, err := run(t, "--help")
	if err != nil {
		t.Fatalf("--help: %v", err)
	}
	for _, want := range []string{"build", "serve", "init", "pagify"} {
		if !strings.Contains(stdout, want) {
			t.Errorf("--help output missing %q\ngot:\n%s", want, stdout)
		}
	}

	stdout, _, err = run(t, "--version")
	if err != nil {
		t.Fatalf("--version: %v", err)
	}
	if !strings.Contains(stdout, version) {
		t.Errorf("--version output missing %q\ngot:\n%s", version, stdout)
	}
}

func TestBuildWritesTheSite(t *testing.T) {
	contentDir, outputDir := scaffold(t)

	stdout, _, err := run(t, "build", contentDir, "--output", outputDir)
	if err != nil {
		t.Fatalf("build: %v", err)
	}
	if !strings.Contains(stdout, "Built 2 pages") {
		t.Errorf("build summary missing the page count\ngot:\n%s", stdout)
	}
	if _, err := os.Stat(filepath.Join(outputDir, "index.html")); err != nil {
		t.Errorf("index.html was not written: %v", err)
	}
}

func TestBuildDefaultsToDocsAndDist(t *testing.T) {
	root := t.TempDir()
	t.Chdir(root)
	scaffoldIn(t, "docs")

	var out bytes.Buffer
	command := NewRootCommand(&out, &out)
	command.SetArgs([]string{"build"})

	if err := command.Execute(); err != nil {
		t.Fatalf("build: %v", err)
	}
	if _, err := os.Stat(filepath.Join(root, "dist", "index.html")); err != nil {
		t.Errorf("build did not default to ./dist: %v", err)
	}
}

func TestBuildReportsMissingContent(t *testing.T) {
	root := t.TempDir()
	_, _, err := run(t, "build", filepath.Join(root, "absent"))
	if err == nil {
		t.Fatal("build succeeded with a missing content directory, want an error")
	}
	if !strings.Contains(err.Error(), "absent") {
		t.Errorf("error does not name the missing path: %v", err)
	}
}

func TestBuildRejectsTooManyArguments(t *testing.T) {
	if _, _, err := run(t, "build", "a", "b"); err == nil {
		t.Fatal("build accepted two positional arguments, want an error")
	}
}

func TestInitCreatesAProject(t *testing.T) {
	target := filepath.Join(t.TempDir(), "site")

	stdout, _, err := run(t, "init", target)
	if err != nil {
		t.Fatalf("init: %v", err)
	}
	if !strings.Contains(stdout, "pagify serve") {
		t.Errorf("init output missing next steps\ngot:\n%s", stdout)
	}

	for _, name := range []string{"docs/index.md", "docs/guide/index.md", "docs/guide/getting-started.md"} {
		if _, err := os.Stat(filepath.Join(target, filepath.FromSlash(name))); err != nil {
			t.Errorf("init did not create %s: %v", name, err)
		}
	}
}

func TestInitThenBuildSucceeds(t *testing.T) {
	target := filepath.Join(t.TempDir(), "site")

	if _, _, err := run(t, "init", target); err != nil {
		t.Fatalf("init: %v", err)
	}
	outputDir := filepath.Join(target, "dist")
	if _, _, err := run(t, "build", filepath.Join(target, "docs"), "--output", outputDir); err != nil {
		t.Fatalf("build after init: %v", err)
	}
	if _, err := os.Stat(filepath.Join(outputDir, "index.html")); err != nil {
		t.Errorf("build after init produced no index.html: %v", err)
	}
}

func TestInitRefusesToOverwrite(t *testing.T) {
	target := t.TempDir()
	if _, _, err := run(t, "init", target); err != nil {
		t.Fatalf("first init: %v", err)
	}

	_, _, err := run(t, "init", target)
	if err == nil {
		t.Fatal("init overwrote existing files without --force, want an error")
	}
	if !strings.Contains(err.Error(), "--force") {
		t.Errorf("error does not mention --force: %v", err)
	}
}

func TestInitForceOverwrites(t *testing.T) {
	target := t.TempDir()
	if _, _, err := run(t, "init", target); err != nil {
		t.Fatalf("first init: %v", err)
	}

	if _, _, err := run(t, "init", target, "--force"); err != nil {
		t.Fatalf("init --force: %v", err)
	}
}

func TestServeHasTheExpectedFlags(t *testing.T) {
	command := NewRootCommand(&bytes.Buffer{}, &bytes.Buffer{})

	var serve *cobra.Command
	for _, sub := range command.Commands() {
		if sub.Name() == "serve" {
			serve = sub
		}
	}
	if serve == nil {
		t.Fatal("no serve subcommand")
	}
	for _, name := range []string{"host", "port"} {
		if serve.Flags().Lookup(name) == nil {
			t.Errorf("serve has no --%s flag", name)
		}
	}
}

// scaffold writes a small content tree and returns its directories.
func scaffold(t *testing.T) (contentDir, outputDir string) {
	t.Helper()
	root := t.TempDir()
	return scaffoldIn(t, filepath.Join(root, "docs")), filepath.Join(root, "dist")
}

// scaffoldIn writes a small content tree at an exact path.
func scaffoldIn(t *testing.T, contentDir string) string {
	t.Helper()
	files := map[string]string{
		"index.md":       "---\ntitle: Home\n---\n\n# Home\n\n[Guide](guide/index.md)\n",
		"guide/index.md": "# Guide\n",
	}
	for name, content := range files {
		path := filepath.Join(contentDir, filepath.FromSlash(name))
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatalf("create directory for %s: %v", name, err)
		}
		if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
			t.Fatalf("write %s: %v", name, err)
		}
	}
	return contentDir
}
