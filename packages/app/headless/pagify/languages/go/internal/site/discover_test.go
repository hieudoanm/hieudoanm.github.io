package site

import (
	"os"
	"path/filepath"
	"sort"
	"testing"
)

// writeFiles creates a content tree from a path-to-contents map, making parent
// directories as needed.
func writeFiles(t *testing.T, root string, files map[string]string) {
	t.Helper()
	for name, content := range files {
		path := filepath.Join(root, filepath.FromSlash(name))
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatalf("create directory for %s: %v", name, err)
		}
		if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
			t.Fatalf("write %s: %v", name, err)
		}
	}
}

// sourcesOf lists the discovered page sources, for order-sensitive assertions.
func sourcesOf(pages Pages) []string {
	sources := make([]string, 0, len(pages))
	for _, page := range pages {
		sources = append(sources, page.Source)
	}
	return sources
}

// equal reports whether two string slices hold the same values in the same
// order.
func equal(got, want []string) bool {
	if len(got) != len(want) {
		return false
	}
	for i := range got {
		if got[i] != want[i] {
			return false
		}
	}
	return true
}

// sortedKeys lists a map's keys in order, so assertions do not depend on
// Go's randomised map iteration.
func sortedKeys(values map[string][]byte) []string {
	keys := make([]string, 0, len(values))
	for key := range values {
		keys = append(keys, key)
	}
	sort.Strings(keys)
	return keys
}

func TestDiscoverFindsPagesAndAssets(t *testing.T) {
	root := t.TempDir()
	writeFiles(t, root, map[string]string{
		"index.md":              "# Home",
		"guide/index.md":        "# Guide",
		"guide/install.md":      "# Install",
		"guide/img/diagram.svg": "<svg/>",
		"notes.txt":             "side file",
		".hidden/secret.md":     "# Hidden",
		"_sidebar.md":           "partial",
		"pagify.yaml":           "title: Test",
	})

	content, err := Discover(root)
	if err != nil {
		t.Fatalf("Discover: %v", err)
	}

	want := []string{"guide/index.md", "guide/install.md", "index.md"}
	if got := sourcesOf(content.Pages); !equal(got, want) {
		t.Errorf("pages = %v, want %v", got, want)
	}
	wantAssets := []string{"guide/img/diagram.svg", "notes.txt"}
	if got := sortedKeys(content.Assets); !equal(got, wantAssets) {
		t.Errorf("assets = %v, want %v", got, wantAssets)
	}
}

func TestDiscoverSkipsHiddenDirectories(t *testing.T) {
	root := t.TempDir()
	writeFiles(t, root, map[string]string{
		"index.md":          "# Home",
		"node_modules/x.md": "# Vendored",
		"dist/stale.md":     "# Previous build",
	})

	content, err := Discover(root)
	if err != nil {
		t.Fatalf("Discover: %v", err)
	}
	if got := sourcesOf(content.Pages); !equal(got, []string{"index.md"}) {
		t.Errorf("pages = %v, want only index.md", got)
	}
}

func TestDiscoverReadsFrontmatter(t *testing.T) {
	root := t.TempDir()
	writeFiles(t, root, map[string]string{
		"index.md": "# Home",
		"guide.md": "---\ntitle: Custom\ndescription: A description\nlabel: Short\norder: 3\n---\n\n# Guide\n",
	})

	content, err := Discover(root)
	if err != nil {
		t.Fatalf("Discover: %v", err)
	}

	page := content.Pages[0]
	if page.Title != "Custom" {
		t.Errorf("Title = %q, want %q", page.Title, "Custom")
	}
	if page.Description != "A description" {
		t.Errorf("Description = %q, want %q", page.Description, "A description")
	}
	if page.NavTitle() != "Short" {
		t.Errorf("NavTitle() = %q, want %q", page.NavTitle(), "Short")
	}
	if page.Order == nil || *page.Order != 3 {
		t.Errorf("Order = %v, want 3", page.Order)
	}
	if string(page.Content) != "# Guide\n" {
		t.Errorf("Content = %q, want frontmatter stripped", page.Content)
	}
}

func TestDiscoverOrdersByOrderThenSource(t *testing.T) {
	root := t.TempDir()
	writeFiles(t, root, map[string]string{
		"index.md": "# Home",
		"zebra.md": "---\norder: 1\n---\n\n# Zebra",
		"alpha.md": "# Alpha",
		"beta.md":  "---\norder: 1\n---\n\n# Beta",
	})

	content, err := Discover(root)
	if err != nil {
		t.Fatalf("Discover: %v", err)
	}
	// Pages sharing an order fall back to source order; unordered pages sort last.
	want := []string{"beta.md", "zebra.md", "alpha.md", "index.md"}
	if got := sourcesOf(content.Pages); !equal(got, want) {
		t.Errorf("pages = %v, want %v", got, want)
	}
}

func TestDiscoverFailsWithoutMarkdown(t *testing.T) {
	root := t.TempDir()
	writeFiles(t, root, map[string]string{"notes.txt": "no markdown here"})

	if _, err := Discover(root); err == nil {
		t.Fatal("Discover succeeded on a directory with no Markdown, want an error")
	}
}

func TestDiscoverFailsOnFile(t *testing.T) {
	root := t.TempDir()
	writeFiles(t, root, map[string]string{"index.md": "# Home"})

	if _, err := Discover(filepath.Join(root, "index.md")); err == nil {
		t.Fatal("Discover succeeded on a file, want an error")
	}
}

func TestDiscoverFailsOnMissingDirectory(t *testing.T) {
	if _, err := Discover(filepath.Join(t.TempDir(), "absent")); err == nil {
		t.Fatal("Discover succeeded on a missing directory, want an error")
	}
}

func TestDiscoverExtractsSiteFrontmatterFromIndex(t *testing.T) {
	root := t.TempDir()
	writeFiles(t, root, map[string]string{
		"index.md": "---\ntitle: My Site\nlanguage: en\nbasePath: /my-repo\ntheme: dark\nfooter: © 2024\n---\n\n# Home\n",
		"guide.md": "# Guide\n",
	})

	content, err := Discover(root)
	if err != nil {
		t.Fatalf("Discover: %v", err)
	}

	if content.IndexFrontmatter == nil {
		t.Fatal("IndexFrontmatter is nil, expected map with site config")
	}
	want := map[string]string{
		"title":    "My Site",
		"language": "en",
		"basePath": "/my-repo",
		"theme":    "dark",
		"footer":   "© 2024",
	}
	for k, v := range want {
		if content.IndexFrontmatter[k] != v {
			t.Errorf("IndexFrontmatter[%q] = %q, want %q", k, content.IndexFrontmatter[k], v)
		}
	}
}
