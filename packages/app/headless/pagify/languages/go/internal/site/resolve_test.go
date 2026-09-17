package site

import (
	"testing"

	"pagify/internal/markdown"
)

// identity is the prefix used when no base path is configured.
func identity(url string) string { return url }

// prefixed adds a base path the way the build's config does.
func prefixed(url string) string {
	if url == "/" {
		return "/my-repo/"
	}
	return "/my-repo" + url
}

// resolverFor builds a resolver over a small content tree, mirroring how the
// build constructs one per page directory.
func resolverFor(dir string, prefix Prefixer) markdown.Resolver {
	pages := Pages{
		page("index.md"),
		page("guide/index.md"),
		page("guide/installation.md"),
		page("reference/cli.md"),
	}
	assets := map[string][]byte{
		"img/diagram.svg":     []byte("<svg/>"),
		"guide/img/flow.svg":  []byte("<svg/>"),
		"downloads/pagify.gz": []byte("binary"),
	}
	return newResolver(dir, pages, assets, prefix).resolve
}

func TestResolveRewritesMarkdownLinks(t *testing.T) {
	tests := []struct {
		name string
		dir  string
		in   string
		want string
	}{
		{name: "sibling page", dir: ".", in: "guide/installation.md", want: "/guide/installation/"},
		{name: "directory index", dir: ".", in: "guide/index.md", want: "/guide/"},
		{name: "index in the current directory", dir: "guide", in: "index.md", want: "/guide/"},
		{name: "parent traversal", dir: "guide", in: "../reference/cli.md", want: "/reference/cli/"},
		{name: "root relative", dir: "guide", in: "/reference/cli.md", want: "/reference/cli/"},
		{name: "from a nested page", dir: "guide/advanced", in: "../installation.md", want: "/guide/installation/"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := string(resolverFor(test.dir, identity)([]byte(test.in)))
			if got != test.want {
				t.Errorf("resolve(%q) from %q = %q, want %q", test.in, test.dir, got, test.want)
			}
		})
	}
}

func TestResolveKeepsFragment(t *testing.T) {
	got := string(resolverFor("guide", identity)([]byte("installation.md#requirements")))
	if want := "/guide/installation/#requirements"; got != want {
		t.Errorf("resolve with fragment = %q, want %q", got, want)
	}
}

func TestResolveRewritesAssetLinks(t *testing.T) {
	tests := []struct {
		name string
		dir  string
		in   string
		want string
	}{
		{name: "root asset", dir: ".", in: "img/diagram.svg", want: "/img/diagram.svg"},
		{name: "relative asset", dir: "guide", in: "img/flow.svg", want: "/guide/img/flow.svg"},
		{name: "parent asset", dir: "guide", in: "../downloads/pagify.gz", want: "/downloads/pagify.gz"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := string(resolverFor(test.dir, identity)([]byte(test.in)))
			if got != test.want {
				t.Errorf("resolve(%q) from %q = %q, want %q", test.in, test.dir, got, test.want)
			}
		})
	}
}

func TestResolveAppliesBasePath(t *testing.T) {
	tests := []struct {
		name string
		in   string
		want string
	}{
		{name: "page", in: "guide/installation.md", want: "/my-repo/guide/installation/"},
		{name: "home", in: "index.md", want: "/my-repo/"},
		{name: "asset", in: "img/diagram.svg", want: "/my-repo/img/diagram.svg"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := string(resolverFor(".", prefixed)([]byte(test.in)))
			if got != test.want {
				t.Errorf("resolve(%q) with base path = %q, want %q", test.in, got, test.want)
			}
		})
	}
}

func TestResolveLeavesExternalAndUnknownLinksAlone(t *testing.T) {
	tests := []struct {
		name string
		in   string
	}{
		{name: "https", in: "https://example.com/page.md"},
		{name: "mailto", in: "mailto:docs@example.com"},
		{name: "protocol relative", in: "//cdn.example.com/asset.svg"},
		{name: "fragment only", in: "#section"},
		{name: "already published url", in: "/guide/installation/"},
		{name: "missing page", in: "guide/missing.md"},
		{name: "missing asset", in: "img/absent.svg"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := string(resolverFor(".", identity)([]byte(test.in)))
			if got != test.in {
				t.Errorf("resolve(%q) = %q, want it unchanged", test.in, got)
			}
		})
	}
}

func TestResolveIsIdempotent(t *testing.T) {
	resolve := resolverFor("guide", identity)
	once := string(resolve([]byte("installation.md")))
	twice := string(resolve([]byte(once)))
	if once != twice {
		t.Errorf("resolve twice = %q then %q, want them equal", once, twice)
	}
}

func TestHasScheme(t *testing.T) {
	tests := []struct {
		url  string
		want bool
	}{
		{url: "https://example.com", want: true},
		{url: "mailto:a@b.c", want: true},
		{url: "tel:+1234", want: true},
		{url: "guide/ports:80", want: false},
		{url: "guide/cli.md", want: false},
		{url: "../up.md", want: false},
		{url: "", want: false},
	}

	for _, test := range tests {
		t.Run(test.url, func(t *testing.T) {
			if got := hasScheme(test.url); got != test.want {
				t.Errorf("hasScheme(%q) = %v, want %v", test.url, got, test.want)
			}
		})
	}
}
