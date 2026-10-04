package build

import (
	"encoding/json"
	"fmt"
	"path"
	"strings"

	"pagify/internal/site"
	"pagify/internal/theme"
)

// searchIndexName is the generated index the theme's search box reads. It sits
// beside the theme assets so one Asset lookup resolves it, and it is plain
// JSON so the browser fetches one small file instead of crawling every page.
const searchIndexName = "search-index.json"

// searchDocument is one page's entry in the search index. Body holds the
// page's text with markup removed, truncated so one long page cannot dominate
// the index size.
type searchDocument struct {
	Title string `json:"title"`
	URL   string `json:"url"`
	Body  string `json:"body"`
}

// maxSearchBody is the character budget per page. Long pages contribute their
// opening text, which is where the terms a reader searches for usually are.
const maxSearchBody = 2000

// writeSearchIndex writes search-index.json and reports 1, so callers can count
// it alongside the copied assets. Page URLs go through config so search results
// link to the same addresses as the sidebar.
func writeSearchIndex(outputDir string, config Config, pages site.Pages) (int, error) {
	if len(pages) == 0 {
		return 0, nil
	}
	documents := make([]searchDocument, 0, len(pages))
	for _, page := range pages {
		documents = append(documents, searchDocument{
			Title: page.NavTitle(),
			URL:   config.url(page.URL),
			Body:  summarize(page.HTML),
		})
	}

	encoded, err := json.Marshal(documents)
	if err != nil {
		return 0, fmt.Errorf("encode search index: %w", err)
	}
	target := path.Join(theme.AssetDir, searchIndexName)
	if err := writeFile(outputDir, target, encoded); err != nil {
		return 0, err
	}
	return 1, nil
}

// summarize reduces rendered HTML to the plain text a reader would search for.
// Tags are dropped, script and style bodies are skipped entirely, and entities
// are decoded, so a search matches what the page actually shows.
func summarize(html string) string {
	collapsed := strings.Join(strings.Fields(decodeEntities(visibleText(html))), " ")
	if len(collapsed) > maxSearchBody {
		return collapsed[:maxSearchBody]
	}
	return collapsed
}

// invisibleElements hold code rather than prose, so their contents must not
// become searchable text.
var invisibleElements = []string{"script", "style", "template"}

// noSearchAttribute lets the renderer mark generated decoration, such as a
// callout's "Tip" label, as not worth matching.
const noSearchAttribute = "data-no-search"

// visibleText keeps the character data between tags, dropping the contents of
// elements that hold code or are marked with noSearchAttribute. It scans once
// and keeps a stack of the open elements, so it is linear regardless of how many
// tags there are and nesting cannot unbalance it.
func visibleText(html string) string {
	var text strings.Builder
	lower := strings.ToLower(html)
	// open holds one entry per open element, recording whether it hides its
	// contents, so a closing tag can restore the enclosing state exactly.
	var open []bool
	hidden := 0

	for offset := 0; offset < len(html); {
		if html[offset] != '<' {
			if hidden == 0 {
				text.WriteByte(html[offset])
			}
			offset++
			continue
		}

		end := strings.IndexByte(html[offset:], '>')
		if end < 0 {
			break
		}
		// tag is the element name without the angle brackets, so a closing tag
		// arrives as "/script" and a self-closing one as "script/".
		tag := lower[offset+1 : offset+end]
		switch {
		case strings.HasSuffix(tag, "/"):
		case strings.HasPrefix(tag, "/"):
			if len(open) > 0 {
				if open[len(open)-1] {
					hidden--
				}
				open = open[:len(open)-1]
			}
		default:
			hide := hidesContents(tag)
			open = append(open, hide)
			if hide {
				hidden++
			}
		}
		offset += end + 1
		if hidden == 0 {
			text.WriteByte(' ')
		}
	}
	return text.String()
}

// hidesContents reports whether a tag names an element whose contents are not
// prose. tag is the element name and attributes without angle brackets, so
// "<script>" arrives as "script" and "</script>" as "/script".
func hidesContents(tag string) bool {
	name := strings.Trim(tag, "/")
	if cut := strings.IndexAny(name, " \t\n"); cut >= 0 {
		name = name[:cut]
	}
	for _, element := range invisibleElements {
		if name == element {
			return true
		}
	}
	return strings.Contains(tag, noSearchAttribute)
}

// decodeEntities expands the handful of entities goldmark emits for inline
// markup, so a search for "AT&T" or "a & b" matches the rendered text.
func decodeEntities(text string) string {
	replacer := strings.NewReplacer(
		"&amp;", "&",
		"&lt;", "<",
		"&gt;", ">",
		"&quot;", `"`,
		"&#39;", "'",
		"&nbsp;", " ",
	)
	return replacer.Replace(text)
}
