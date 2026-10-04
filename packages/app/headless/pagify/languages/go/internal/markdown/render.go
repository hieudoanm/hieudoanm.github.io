// Package markdown turns Markdown source into HTML plus the two extras the
// site builder needs: a heading outline for page navigation, and a link
// resolver so `.md` links keep working after the build rewrites URLs.
package markdown

import (
	"bytes"
	"fmt"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/ast"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/renderer/html"
	"github.com/yuin/goldmark/text"
	"github.com/yuin/goldmark/util"
)

// calloutPriority is lower than goldmark's own HTML renderer (1000), so the
// callout renderer registers last and wins for blockquotes.
const calloutPriority = 100

// Resolver maps a link or image destination found in Markdown onto the
// destination the built site should use. Returning the input unchanged leaves
// the destination alone.
type Resolver func(destination []byte) []byte

// Document is one rendered page: its HTML body, plus the outline of its
// headings already carrying the anchor ids the HTML contains.
type Document struct {
	HTML    []byte
	Outline Outline
	// Title is the text of the page's leading level-1 heading, already lifted
	// out of HTML. Empty when the document has no such heading.
	Title string
}

// Renderer converts Markdown to documents. The goldmark instance holds no
// per-document state, so one Renderer serves a whole site.
type Renderer struct {
	md goldmark.Markdown
}

// NewRenderer returns a Renderer with the extensions pagify enables by
// default: GitHub-flavoured tables, task lists, strikethrough and autolinks,
// footnotes, automatic heading ids, and raw HTML passthrough.
func NewRenderer() *Renderer {
	return &Renderer{md: goldmark.New(
		goldmark.WithExtensions(extension.GFM, extension.Footnote),
		goldmark.WithParserOptions(parser.WithAutoHeadingID()),
		goldmark.WithRendererOptions(
			// Authors embed figures, badges and <details> blocks. This is
			// their own local Markdown, not untrusted input.
			html.WithUnsafe(),
			renderer.WithNodeRenderers(
				util.Prioritized(&calloutRenderer{}, calloutPriority),
			),
		),
	)}
}

// Render converts src to a Document. resolve may be nil, in which case link
// and image destinations are left exactly as written.
func (r *Renderer) Render(src []byte, resolve Resolver) (*Document, error) {
	reader := text.NewReader(src)
	tree := r.md.Parser().Parse(reader)
	doc := tree.(*ast.Document)

	title := takeLeadingTitle(doc, src)
	walk := newTransform(src, resolve)
	walk.Transform(doc, reader, parser.NewContext())

	var buf bytes.Buffer
	if err := r.md.Renderer().Render(&buf, src, tree); err != nil {
		return nil, fmt.Errorf("render markdown: %w", err)
	}
	return &Document{HTML: buf.Bytes(), Outline: walk.outline, Title: title}, nil
}
