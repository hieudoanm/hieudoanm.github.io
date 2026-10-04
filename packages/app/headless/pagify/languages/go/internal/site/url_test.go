package site

import "testing"

func TestURLForSource(t *testing.T) {
	tests := []struct {
		name   string
		source string
		want   string
	}{
		{name: "root index", source: "index.md", want: "/"},
		{name: "readme is the home page", source: "README.md", want: "/"},
		{name: "directory index", source: "guide/index.md", want: "/guide/"},
		{name: "nested directory index", source: "a/b/index.md", want: "/a/b/"},
		{name: "page", source: "getting-started.md", want: "/getting-started/"},
		{name: "nested page", source: "guide/installation.md", want: "/guide/installation/"},
		{name: "longer extension", source: "guide/syntax.markdown", want: "/guide/syntax/"},
		{name: "leading slash", source: "/guide/index.md", want: "/guide/"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := URLForSource(test.source); got != test.want {
				t.Errorf("URLForSource(%q) = %q, want %q", test.source, got, test.want)
			}
		})
	}
}

func TestOutputPathForSource(t *testing.T) {
	tests := []struct {
		name   string
		source string
		want   string
	}{
		{name: "root index", source: "index.md", want: "index.html"},
		{name: "readme is the home page", source: "README.md", want: "index.html"},
		{name: "directory index", source: "guide/index.md", want: "guide/index.html"},
		{name: "page", source: "guide/installation.md", want: "guide/installation/index.html"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := OutputPathForSource(test.source); got != test.want {
				t.Errorf("OutputPathForSource(%q) = %q, want %q", test.source, got, test.want)
			}
		})
	}
}

func TestTitleFromSource(t *testing.T) {
	tests := []struct {
		name   string
		source string
		want   string
	}{
		{name: "kebab case", source: "getting-started.md", want: "Getting Started"},
		{name: "snake case", source: "cli_reference.md", want: "Cli Reference"},
		{name: "root index", source: "index.md", want: "Home"},
		{name: "directory index", source: "guide/index.md", want: "Guide"},
		{name: "nested index", source: "a/b/index.md", want: "B"},
		{name: "already capitalised", source: "CHANGELOG.md", want: "CHANGELOG"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := titleFromSource(test.source); got != test.want {
				t.Errorf("titleFromSource(%q) = %q, want %q", test.source, got, test.want)
			}
		})
	}
}
