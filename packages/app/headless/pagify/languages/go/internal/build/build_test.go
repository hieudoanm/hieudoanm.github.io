package build

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// contentFiles is the fixture tree used by most build tests: a root index, a
// two-level guide, an asset, and a config file.
var contentFiles = map[string]string{
	"index.md":                     "---\ntitle: Home\ndescription: The front page.\n---\n\n# Home\n\nSee the [guide](guide/index.md).\n",
	"guide/index.md":               "---\ntitle: Guide\norder: 1\n---\n\n# Guide\n\nInstall it from the [install page](installation.md).\n",
	"guide/installation.md":        "# Installation\n\nBack to the [guide](index.md) or the [CLI](../reference/cli.md).\n",
	"guide/installation.md.backup": "not markdown\n",
	"reference/cli.md":             "# CLI\n\nOptions live in `pagify.yaml`.\n",
	"guide/img/diagram.svg":        "<svg/>",
}

// buildFixture writes the fixture content into a temporary directory and builds
// it, returning the content and output directories.
func buildFixture(t *testing.T, files map[string]string) (contentDir, outputDir string) {
	t.Helper()
	return buildFixtureExpecting(t, files, -1)
}

// buildFixtureExpecting is buildFixture with an explicit page count, for
// fixtures that do not use the shared tree.
func buildFixtureExpecting(t *testing.T, files map[string]string, wantPages int) (contentDir, outputDir string) {
	t.Helper()
	root := t.TempDir()
	contentDir = filepath.Join(root, "docs")
	outputDir = filepath.Join(root, "dist")

	if err := os.MkdirAll(contentDir, 0o755); err != nil {
		t.Fatalf("create content directory: %v", err)
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

	result, err := Build(Options{ContentDir: contentDir, OutputDir: outputDir})
	if err != nil {
		t.Fatalf("Build: %v", err)
	}
	if wantPages >= 0 && result.Pages != wantPages {
		t.Errorf("result.Pages = %d, want %d", result.Pages, wantPages)
	}
	return contentDir, outputDir
}

// readOutput reads one built file, failing the test if it is missing.
func readOutput(t *testing.T, outputDir, name string) string {
	t.Helper()
	data, err := os.ReadFile(filepath.Join(outputDir, filepath.FromSlash(name)))
	if err != nil {
		t.Fatalf("read %s: %v", name, err)
	}
	return string(data)
}

// assertContains fails unless content includes every fragment.
func assertContains(t *testing.T, label, content string, fragments ...string) {
	t.Helper()
	for _, fragment := range fragments {
		if !strings.Contains(content, fragment) {
			t.Errorf("%s missing %q", label, fragment)
		}
	}
}

func TestBuildWritesExpectedFiles(t *testing.T) {
	_, outputDir := buildFixtureExpecting(t, contentFiles, 4)

	for _, name := range []string{
		"index.html",
		"guide/index.html",
		"guide/installation/index.html",
		"reference/cli/index.html",
		"assets/styles.css",
		"assets/script.js",
		"assets/favicon.ico",
		"assets/guide/img/diagram.svg",
		"assets/search-index.json",
		"assets/search.js",
	} {
		if _, err := os.Stat(filepath.Join(outputDir, filepath.FromSlash(name))); err != nil {
			t.Errorf("expected output file %s: %v", name, err)
		}
	}
}

func TestBuildRewritesMarkdownLinks(t *testing.T) {
	_, outputDir := buildFixture(t, contentFiles)

	home := readOutput(t, outputDir, "index.html")
	assertContains(t, "index.html", home, `href="/guide/"`)

	install := readOutput(t, outputDir, "guide/installation/index.html")
	assertContains(t, "install page", install, `href="/guide/"`, `href="/reference/cli/"`)
}

func TestBuildRendersMarkdownFeatures(t *testing.T) {
	_, outputDir := buildFixture(t, contentFiles)

	home := readOutput(t, outputDir, "index.html")
	assertContains(t, "index.html", home,
		`<h1 id="page-title"`,
		`name="description" content="The front page."`,
	)
	// The fixture's "# Home" is the page title, so the body must not repeat it.
	if strings.Contains(home, `<h1 id="home">`) {
		t.Errorf("index.html repeats the page title in the body:\n%s", home)
	}
}

func TestBuildGeneratesALandingPageWithoutOne(t *testing.T) {
	files := map[string]string{
		"pagify.yaml":    "title: Handbook\n",
		"guide/index.md": "# Guide\n",
		"guide/setup.md": "# Setup\n",
	}
	_, outputDir := buildFixtureExpecting(t, files, 2)

	landing := readOutput(t, outputDir, "index.html")
	assertContains(t, "index.html", landing,
		"Handbook</h1>",
		`class="landing"`,
		`href="/guide/"`,
		`href="/guide/setup/"`,
	)
}

func TestBuildDoesNotOverrideAnAuthoredLandingPage(t *testing.T) {
	_, outputDir := buildFixture(t, contentFiles)

	landing := readOutput(t, outputDir, "index.html")
	assertContains(t, "index.html", landing, "See the")
	if strings.Contains(landing, `class="landing"`) {
		t.Errorf("index.html was replaced by the generated landing page:\n%s", landing)
	}
}

func TestBuildPrefersTheHeadingTitleWithoutFrontmatter(t *testing.T) {
	files := map[string]string{"guide/installation.md": "# Install the CLI\n\nBody.\n"}
	_, outputDir := buildFixtureExpecting(t, files, 1)

	install := readOutput(t, outputDir, "guide/installation/index.html")
	assertContains(t, "guide/installation", install, ">Install the CLI<", "Install the CLI</h1>")
}

func TestBuildKeepsTheFrontmatterTitleOverTheHeading(t *testing.T) {
	files := map[string]string{
		"guide/installation.md": "---\ntitle: Installation\nlabel: Install\n---\n\n# Install the CLI\n\nBody.\n",
	}
	_, outputDir := buildFixtureExpecting(t, files, 1)

	install := readOutput(t, outputDir, "guide/installation/index.html")
	assertContains(t, "guide/installation", install,
		"Installation</h1>",
		`href="/guide/installation/"`,
		`aria-current="page">Install<`,
	)
	if strings.Contains(install, "Install the CLI") {
		t.Errorf("page still prints the heading it superseded:\n%s", install)
	}
}

func TestBuildAppliesBasePath(t *testing.T) {
	files := map[string]string{"index.md": "# Home\n\n[guide](guide/index.md)\n"}
	files["guide/index.md"] = "# Guide\n"
	files["pagify.yaml"] = "title: Docs\nbasePath: /my-repo\n"

	_, outputDir := buildFixtureExpecting(t, files, 2)
	home := readOutput(t, outputDir, "index.html")
	assertContains(t, "index.html", home,
		`href="/my-repo/"`,
		`href="/my-repo/guide/"`,
		`href="/my-repo/assets/styles.css"`,
		`src="/my-repo/assets/script.js"`,
	)
}

func TestBuildSkipsBackupsAndHiddenFiles(t *testing.T) {
	_, outputDir := buildFixture(t, contentFiles)

	if _, err := os.Stat(filepath.Join(outputDir, "assets/guide/installation.md.backup")); err == nil {
		t.Error("a .backup file was copied into the output")
	}
}

func TestBuildClearsPreviousOutput(t *testing.T) {
	contentDir, outputDir := buildFixture(t, contentFiles)

	stale := filepath.Join(outputDir, "stale", "page.html")
	if err := os.MkdirAll(filepath.Dir(stale), 0o755); err != nil {
		t.Fatalf("create stale file: %v", err)
	}
	if err := os.WriteFile(stale, []byte("old"), 0o644); err != nil {
		t.Fatalf("write stale file: %v", err)
	}

	if _, err := Build(Options{ContentDir: contentDir, OutputDir: outputDir}); err != nil {
		t.Fatalf("Build: %v", err)
	}
	if _, err := os.Stat(stale); err == nil {
		t.Error("a stale page survived the rebuild")
	}
}

func TestBuildFailsOnMissingContentDirectory(t *testing.T) {
	root := t.TempDir()
	_, err := Build(Options{
		ContentDir: filepath.Join(root, "absent"),
		OutputDir:  filepath.Join(root, "dist"),
	})
	if err == nil {
		t.Fatal("Build succeeded with no content directory, want an error")
	}
	assertContains(t, "error", err.Error(), "absent")
}

func TestBuildFailsOnMalformedConfig(t *testing.T) {
	files := map[string]string{
		"index.md":    "# Home\n",
		"pagify.yaml": "title: [unclosed\n",
	}

	root := t.TempDir()
	contentDir := filepath.Join(root, "docs")
	if err := os.MkdirAll(contentDir, 0o755); err != nil {
		t.Fatalf("create content directory: %v", err)
	}
	for name, content := range files {
		if err := os.WriteFile(filepath.Join(contentDir, name), []byte(content), 0o644); err != nil {
			t.Fatalf("write %s: %v", name, err)
		}
	}

	_, err := Build(Options{ContentDir: contentDir, OutputDir: filepath.Join(root, "dist")})
	if err == nil {
		t.Fatal("Build accepted malformed pagify.yaml, want an error")
	}
	assertContains(t, "error", err.Error(), "pagify.yaml")
}

func TestBuildIsReproducible(t *testing.T) {
	contentDir, outputDir := buildFixture(t, contentFiles)

	first := readOutput(t, outputDir, "index.html")
	if _, err := Build(Options{ContentDir: contentDir, OutputDir: outputDir}); err != nil {
		t.Fatalf("second Build: %v", err)
	}
	if second := readOutput(t, outputDir, "index.html"); second != first {
		t.Error("two builds of the same content produced different output")
	}
}
