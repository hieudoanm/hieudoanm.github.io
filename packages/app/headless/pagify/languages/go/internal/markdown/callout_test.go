package markdown

import (
	"strings"
	"testing"
)

func TestRenderCallouts(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  string
	}{
		{name: "note", input: "> [!NOTE]\n> Body text.\n", want: `class="callout callout--note"`},
		{name: "tip", input: "> [!TIP]\n> Body text.\n", want: `class="callout callout--tip"`},
		{name: "warning", input: "> [!WARNING]\n> Body text.\n", want: `class="callout callout--warning"`},
		{name: "danger", input: "> [!DANGER]\n> Body text.\n", want: `class="callout callout--danger"`},
		{name: "caution is an alias", input: "> [!CAUTION]\n> Body text.\n", want: `class="callout callout--warning"`},
		{name: "lowercase", input: "> [!note]\n> Body text.\n", want: `class="callout callout--note"`},
		{name: "inline body after the marker", input: "> [!NOTE] Careful.\n", want: "Careful."},
		{name: "multi paragraph", input: "> [!TIP]\n> First.\n>\n> Second.\n", want: "Second."},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			out := bodyOf(render(t, test.input))
			if !contains(out, test.want) {
				t.Errorf("rendered HTML missing %q\ngot:\n%s", test.want, out)
			}
		})
	}
}

func TestRenderCalloutStripsTheMarker(t *testing.T) {
	out := bodyOf(render(t, "> [!NOTE]\n> Body text.\n"))
	if contains(out, "[!NOTE]") {
		t.Errorf("marker leaked into the output\ngot:\n%s", out)
	}
	if !contains(out, "Body text.") {
		t.Errorf("callout body missing\ngot:\n%s", out)
	}
}

func TestRenderPlainBlockquoteIsUnchanged(t *testing.T) {
	out := bodyOf(render(t, "> Just a quotation.\n"))
	if !contains(out, "<blockquote>") || !contains(out, "</blockquote>") {
		t.Errorf("plain blockquote did not render as a blockquote\ngot:\n%s", out)
	}
	if contains(out, "callout") {
		t.Errorf("plain blockquote was turned into a callout\ngot:\n%s", out)
	}
}

func TestRenderUnknownCalloutKindStaysABlockquote(t *testing.T) {
	out := bodyOf(render(t, "> [!SPARKLES]\n> Body text.\n"))
	if contains(out, "callout") {
		t.Errorf("unknown callout kind became a callout\ngot:\n%s", out)
	}
	if !contains(out, "SPARKLES") {
		t.Errorf("unknown callout marker was stripped\ngot:\n%s", out)
	}
}

func TestRenderLinkResolverRewritesDestinations(t *testing.T) {
	replace := func(destination []byte) []byte {
		return []byte("/rewritten/" + string(destination))
	}

	document, err := NewRenderer().Render([]byte("[a](one.md) ![b](two.png)"), replace)
	if err != nil {
		t.Fatalf("Render: %v", err)
	}

	out := bodyOf(document)
	for _, want := range []string{`href="/rewritten/one.md"`, `src="/rewritten/two.png"`} {
		if !contains(out, want) {
			t.Errorf("rendered HTML missing %q\ngot:\n%s", want, out)
		}
	}
}

// contains reports whether needle appears in haystack.
func contains(haystack, needle string) bool {
	return strings.Contains(haystack, needle)
}
