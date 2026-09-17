package markdown

import (
	"strings"
	"testing"
)

// render is a test helper that renders src with no link resolver.
func render(t *testing.T, src string) *Document {
	t.Helper()
	document, err := NewRenderer().Render([]byte(src), nil)
	if err != nil {
		t.Fatalf("Render(%q): %v", src, err)
	}
	return document
}

// html returns the rendered body as a string.
func bodyOf(document *Document) string {
	return string(document.HTML)
}

func TestRenderGFMFeatures(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  []string
	}{
		{
			name:  "table",
			input: "| a | b |\n| --- | --- |\n| 1 | 2 |\n",
			want:  []string{"<table>", "<th>a</th>", "<td>2</td>"},
		},
		{
			name:  "strikethrough",
			input: "~~gone~~",
			want:  []string{"<del>gone</del>"},
		},
		{
			name:  "task list",
			input: "- [x] done\n- [ ] todo\n",
			want:  []string{`type="checkbox"`, "checked"},
		},
		{
			name:  "autolink",
			input: "visit https://example.com now",
			want:  []string{`href="https://example.com"`},
		},
		{
			name:  "footnote",
			input: "text[^1]\n\n[^1]: note\n",
			want:  []string{`class="footnote-ref"`, "note"},
		},
		{
			name:  "heading id",
			input: "## Getting Started",
			want:  []string{`id="getting-started"`},
		},
		{
			name:  "raw html passthrough",
			input: "<figure><img src=\"a.png\"></figure>",
			want:  []string{"<figure>", `src="a.png"`},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			out := bodyOf(render(t, test.input))
			for _, want := range test.want {
				if !strings.Contains(out, want) {
					t.Errorf("rendered HTML missing %q\ngot:\n%s", want, out)
				}
			}
		})
	}
}

func TestRenderEscapesRawText(t *testing.T) {
	out := bodyOf(render(t, "a < b & c\n"))
	if !strings.Contains(out, "&lt;") || !strings.Contains(out, "&amp;") {
		t.Errorf("rendered HTML did not escape text\ngot:\n%s", out)
	}
}

func TestRenderCollectsOutline(t *testing.T) {
	document := render(t, "# Title\n\n## Section One\n\n### Deep\n\n## Section Two\n")

	// The leading heading becomes the page title, so it is absent here.
	want := Outline{
		{Level: 2, ID: "section-one", Text: "Section One"},
		{Level: 3, ID: "deep", Text: "Deep"},
		{Level: 2, ID: "section-two", Text: "Section Two"},
	}
	if len(document.Outline) != len(want) {
		t.Fatalf("outline = %+v, want %d entries", document.Outline, len(want))
	}
	for i, expected := range want {
		if document.Outline[i] != expected {
			t.Errorf("outline[%d] = %+v, want %+v", i, document.Outline[i], expected)
		}
	}
}

func TestRenderOutlineFlattensInlineMarkup(t *testing.T) {
	document := render(t, "## The **bold** part\n")
	if got := document.Outline[0].Text; got != "The bold part" {
		t.Errorf("outline text = %q, want %q", got, "The bold part")
	}
}

func TestRenderLiftsTheLeadingHeadingOutOfTheBody(t *testing.T) {
	tests := []struct {
		name      string
		input     string
		wantTitle string
		wantBody  string
		absent    string
	}{
		{
			name:      "atx heading becomes the title",
			input:     "# Getting Started\n\n## Install\n",
			wantTitle: "Getting Started",
			wantBody:  `<h2 id="install">Install</h2>`,
			absent:    "<h1",
		},
		{
			name:      "setext heading becomes the title",
			input:     "Getting Started\n==============\n\nBody.\n",
			wantTitle: "Getting Started",
			wantBody:  "<p>Body.</p>",
			absent:    "<h1",
		},
		{
			name:      "markup inside the heading is flattened",
			input:     "# The `pagify` **CLI**\n\nBody.\n",
			wantTitle: "The pagify CLI",
			wantBody:  "<p>Body.</p>",
			absent:    "<h1",
		},
		{
			name:      "a document without a leading heading keeps its body",
			input:     "Intro.\n\n# Later\n",
			wantTitle: "",
			wantBody:  "<h1 id=\"later\">Later</h1>",
			absent:    "",
		},
		{
			name:      "a leading subheading is left alone",
			input:     "## Section\n\nBody.\n",
			wantTitle: "",
			wantBody:  `<h2 id="section">Section</h2>`,
			absent:    "",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			document := render(t, test.input)
			if document.Title != test.wantTitle {
				t.Errorf("title = %q, want %q", document.Title, test.wantTitle)
			}
			if out := bodyOf(document); !strings.Contains(out, test.wantBody) {
				t.Errorf("body missing %q\ngot:\n%s", test.wantBody, out)
			}
			if test.absent != "" && strings.Contains(bodyOf(document), test.absent) {
				t.Errorf("body still contains %q\ngot:\n%s", test.absent, bodyOf(document))
			}
		})
	}
}
