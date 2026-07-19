package build

import (
	"strings"
	"testing"
)

func TestConfigDefaults(t *testing.T) {
	config := Config{}.withDefaults("docs")

	if config.Title != "docs" {
		t.Errorf("Title = %q, want %q", config.Title, "docs")
	}
	if config.Language != "en" {
		t.Errorf("Language = %q, want en", config.Language)
	}
	if config.Theme != "light" {
		t.Errorf("Theme = %q, want light", config.Theme)
	}
	if config.BasePath != "" {
		t.Errorf("BasePath = %q, want empty", config.BasePath)
	}
}

func TestConfigKeepsExplicitValues(t *testing.T) {
	config := Config{
		Title:    "My Docs",
		Language: "vi",
		Theme:    "dark",
		Footer:   "Copyright",
	}.withDefaults("ignored")

	if config.Title != "My Docs" {
		t.Errorf("Title = %q, want %q", config.Title, "My Docs")
	}
	if config.Language != "vi" || config.Theme != "dark" || config.Footer != "Copyright" {
		t.Errorf("config = %+v, want the explicit values preserved", config)
	}
}

func TestNormalizeBasePath(t *testing.T) {
	tests := []struct {
		in   string
		want string
	}{
		{in: "", want: ""},
		{in: "/", want: ""},
		{in: "/my-repo", want: "/my-repo"},
		{in: "my-repo", want: "/my-repo"},
		{in: "/my-repo/", want: "/my-repo"},
		{in: "///my-repo///", want: "/my-repo"},
		{in: "docs/site", want: "/docs/site"},
	}

	for _, test := range tests {
		t.Run(test.in, func(t *testing.T) {
			if got := normalizeBasePath(test.in); got != test.want {
				t.Errorf("normalizeBasePath(%q) = %q, want %q", test.in, got, test.want)
			}
		})
	}
}

func TestConfigPrefix(t *testing.T) {
	withoutBase := Config{}
	withBase := Config{BasePath: "/my-repo"}

	tests := []struct {
		name string
		url  string
		want string
	}{
		{name: "no base path", url: "/guide/", want: "/guide/"},
		{name: "no base path home", url: "/", want: "/"},
		{name: "with base path", url: "/guide/", want: "/my-repo/guide/"},
		{name: "with base path home", url: "/", want: "/my-repo/"},
		{name: "with base path asset", url: "/assets/styles.css", want: "/my-repo/assets/styles.css"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			config := withoutBase
			if strings.Contains(test.name, "with base path") {
				config = withBase
			}
			if got := config.prefix(test.url); got != test.want {
				t.Errorf("prefix(%q) = %q, want %q", test.url, got, test.want)
			}
		})
	}
}

func TestConfigAssetURL(t *testing.T) {
	withBase := Config{BasePath: "/my-repo"}
	if got, want := withBase.assetURL("styles.css"), "/my-repo/assets/styles.css"; got != want {
		t.Errorf("assetURL = %q, want %q", got, want)
	}
	if got, want := (Config{}).assetURL("script.js"), "/assets/script.js"; got != want {
		t.Errorf("assetURL = %q, want %q", got, want)
	}
}
