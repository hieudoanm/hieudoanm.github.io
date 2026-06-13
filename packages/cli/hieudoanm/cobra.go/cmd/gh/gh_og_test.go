package gh

import (
	"strings"
	"testing"
)

func TestEscapeXML(t *testing.T) {
	tests := []struct {
		input string
		want  string
	}{
		{`&`, `&amp;`},
		{`<`, `&lt;`},
		{`>`, `&gt;`},
		{`'`, `&apos;`},
		{`"`, `&quot;`},
		{`hello & world <foo>`, `hello &amp; world &lt;foo&gt;`},
		{`normal text`, `normal text`},
		{``, ``},
	}

	for _, tt := range tests {
		got := escapeXML(tt.input)
		if got != tt.want {
			t.Errorf("escapeXML(%q) = %q, want %q", tt.input, got, tt.want)
		}
	}
}

func TestGenerateOGSVG(t *testing.T) {
	repo := ghRepo{
		Name:        "test-repo",
		FullName:    "owner/test-repo",
		Description: "A test repository",
		HTMLURL:     "https://github.com/owner/test-repo",
		Stars:       42,
		Forks:       7,
		Language:    "Go",
		Owner: struct {
			Login     string `json:"login"`
			AvatarURL string `json:"avatar_url"`
		}{
			Login:     "owner",
			AvatarURL: "https://avatars.githubusercontent.com/u/1",
		},
	}

	svg := generateOGSVG(repo)

	if !strings.HasPrefix(svg, `<svg xmlns="http://www.w3.org/2000/svg"`) {
		t.Error("expected SVG namespace prefix")
	}
	if !strings.HasSuffix(strings.TrimSpace(svg), "</svg>") {
		t.Error("expected SVG closing tag")
	}
	if !strings.Contains(svg, "test-repo") {
		t.Error("expected SVG to contain repo name")
	}
	if !strings.Contains(svg, "owner") {
		t.Error("expected SVG to contain owner login")
	}
	if !strings.Contains(svg, "A test repository") {
		t.Error("expected SVG to contain description")
	}
	if !strings.Contains(svg, "★ 42") {
		t.Error("expected SVG to contain star count")
	}
	if !strings.Contains(svg, "⑂ 7") {
		t.Error("expected SVG to contain fork count")
	}
	if !strings.Contains(svg, `width="1200"`) {
		t.Error("expected SVG width 1200")
	}
	if !strings.Contains(svg, `height="630"`) {
		t.Error("expected SVG height 630")
	}
}

func TestGenerateOGSVG_emptyDescription(t *testing.T) {
	repo := ghRepo{
		Name:     "empty-desc",
		FullName: "u/empty-desc",
		Language: "Rust",
		Owner: struct {
			Login     string `json:"login"`
			AvatarURL string `json:"avatar_url"`
		}{
			Login: "u",
		},
	}

	svg := generateOGSVG(repo)

	if !strings.Contains(svg, "No description") {
		t.Error("expected default text for empty description")
	}
}

func TestGenerateOGSVG_longDescription(t *testing.T) {
	longDesc := strings.Repeat("a", 200)
	repo := ghRepo{
		Name:        "long-desc",
		FullName:    "u/long-desc",
		Description: longDesc,
		Language:    "Python",
		Owner: struct {
			Login     string `json:"login"`
			AvatarURL string `json:"avatar_url"`
		}{
			Login: "u",
		},
	}

	svg := generateOGSVG(repo)

	if !strings.Contains(svg, "...") {
		t.Error("expected truncated description to end with ...")
	}
	if strings.Contains(svg, longDesc) {
		t.Error("expected long description to be truncated")
	}
}

func TestGenerateOGSVG_unknownLanguageColor(t *testing.T) {
	repo := ghRepo{
		Name:     "unknown-lang",
		FullName: "u/unknown-lang",
		Language: "FooLang",
		Owner: struct {
			Login     string `json:"login"`
			AvatarURL string `json:"avatar_url"`
		}{
			Login: "u",
		},
	}

	svg := generateOGSVG(repo)

	if !strings.Contains(svg, `fill="#6e7681"`) {
		t.Error("expected unknown language to use default color")
	}
}
