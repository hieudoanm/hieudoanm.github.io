package search

import (
	"testing"
)

func TestCleanHTML(t *testing.T) {
	tests := []struct {
		input string
		want  string
	}{
		{"hello &amp; world", "hello & world"},
		{"foo &lt; bar &gt; baz", "foo < bar > baz"},
		{"<b>bold</b>", "bold"},
		{"<a href=\"link\">text</a>", "text"},
		{"hello &nbsp; world", "hello   world"},
		{"plain text", "plain text"},
		{"", ""},
	}
	for _, tc := range tests {
		got := cleanHTML(tc.input)
		if got != tc.want {
			t.Errorf("cleanHTML(%q) = %q, want %q", tc.input, got, tc.want)
		}
	}
}

func TestParseDuckDuckGoResults(t *testing.T) {
	html := `<html>
<body>
<table>
<tr>
<td><a class="result-link" href="https://example.com">Example Title</a></td>
</tr>
<tr>
<td class="result-snippet">This is an example snippet</td>
</tr>
<tr>
<td><a class="result-link" href="https://golang.org">The Go Language</a></td>
</tr>
<tr>
<td class="result-snippet">Go is a programming language</td>
</tr>
</table>
</body>
</html>`

	results := parseDuckDuckGoResults(html, 5)
	if len(results) != 2 {
		t.Fatalf("got %d results, want 2", len(results))
	}

	if results[0].Title != "Example Title" {
		t.Errorf("title = %q, want %q", results[0].Title, "Example Title")
	}
	if results[0].URL != "https://example.com" {
		t.Errorf("url = %q, want %q", results[0].URL, "https://example.com")
	}
	if results[0].Snippet != "This is an example snippet" {
		t.Errorf("snippet = %q", results[0].Snippet)
	}

	if results[1].Title != "The Go Language" {
		t.Errorf("title = %q", results[1].Title)
	}
}

func TestParseDuckDuckGoResultsMax(t *testing.T) {
	html := `<a class="result-link" href="https://a.com">A</a><a class="result-link" href="https://b.com">B</a><a class="result-link" href="https://c.com">C</a>`
	results := parseDuckDuckGoResults(html, 2)
	if len(results) != 2 {
		t.Errorf("got %d results, want 2", len(results))
	}
}

func TestParseDuckDuckGoResultsRelativeURL(t *testing.T) {
	html := `<a class="result-link" href="//relative.com/path">Relative</a>`
	results := parseDuckDuckGoResults(html, 5)
	if len(results) == 0 {
		t.Fatal("expected results")
	}
	if results[0].URL != "https://relative.com/path" {
		t.Errorf("url = %q, want https://relative.com/path", results[0].URL)
	}
}

func TestParseDuckDuckGoResultsNoResults(t *testing.T) {
	results := parseDuckDuckGoResults("<html><body>No results found</body></html>", 5)
	if len(results) != 0 {
		t.Errorf("got %d results, want 0", len(results))
	}
}
