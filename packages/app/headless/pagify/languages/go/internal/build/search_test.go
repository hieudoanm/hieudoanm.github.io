package build

import (
	"strings"
	"testing"
)

func TestSummarizeStripsMarkup(t *testing.T) {
	tests := []struct {
		name string
		html string
		want string
	}{
		{name: "plain text", html: "<p>Hello world</p>", want: "Hello world"},
		{name: "tags between words", html: "<p>a<strong>b</strong>c</p>", want: "a b c"},
		{name: "entities", html: "<p>AT&amp;T and &lt;tag&gt;</p>", want: "AT&amp;T and &lt;tag&gt;"},
		{name: "whitespace collapses", html: "<p>a\n\n   b</p>", want: "a b"},
		{name: "script content removed", html: "<p>a</p><script>var x=1</script>", want: "a"},
		{
			name: "decorated content removed",
			html: `<aside class="callout"><p data-no-search>Tip</p><p>Rebuilds on request.</p></aside>`,
			want: "Rebuilds on request.",
		},
		{
			name: "nesting keeps siblings visible",
			html: `<aside><p data-no-search><span>Tip</span></p><p>Body</p></aside>`,
			want: "Body",
		},
		{
			name: "style content removed",
			html: `<style>.a{color:red}</style><p>Body</p>`,
			want: "Body",
		},
		{
			name: "attributes do not hide sibling elements",
			html: `<p data-lang="go">a</p><p>b</p>`,
			want: "a b",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := summarize(test.html); got != test.want {
				t.Errorf("summarize(%q) = %q, want %q", test.html, got, test.want)
			}
		})
	}
}

func TestSummarizeTruncatesLongPages(t *testing.T) {
	long := "<p>" + strings.Repeat("word ", 1000) + "</p>"
	got := summarize(long)

	if len(got) > maxSearchBody {
		t.Errorf("summarize returned %d characters, want at most %d", len(got), maxSearchBody)
	}
	if !strings.HasPrefix(got, "word word") {
		t.Errorf("summarize truncated the wrong end: %q", got[:40])
	}
}

func TestWriteSearchIndexProducesOneEntryPerPage(t *testing.T) {
	_, outputDir := buildFixture(t, contentFiles)

	index := readOutput(t, outputDir, "assets/search-index.json")
	for _, want := range []string{`"title":"Home"`, `"url":"/"`, `"url":"/guide/"`, `"url":"/reference/cli/"`} {
		if !strings.Contains(index, want) {
			t.Errorf("search index missing %q\ngot:\n%s", want, index)
		}
	}
	if strings.Contains(index, "<") {
		t.Errorf("search index still contains markup\ngot:\n%s", index)
	}
}

func TestWriteSearchIndexAppliesBasePath(t *testing.T) {
	files := map[string]string{
		"index.md":    "# Home\n",
		"pagify.yaml": "basePath: /my-repo\n",
	}
	_, outputDir := buildFixtureExpecting(t, files, 1)

	index := readOutput(t, outputDir, "assets/search-index.json")
	if !strings.Contains(index, `"url":"/my-repo/"`) {
		t.Errorf("search index missing the base path\ngot:\n%s", index)
	}
}
