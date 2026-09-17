package markdown

import (
	"io"

	"github.com/yuin/goldmark/v2/ast"
	"github.com/yuin/goldmark/v2/renderer"
	"github.com/yuin/goldmark/v2/renderer/html"
	"github.com/yuin/goldmark/v2/util"
)

// calloutRenderer replaces the marked callout blockquote's <blockquote>
// wrapper with an <aside>, so the theme can style notes, tips, warnings and
// dangers without asking authors for extra markup.
//
// Registering a renderer for a kind replaces goldmark's own, so this type also
// reproduces the default <blockquote> markup for every unmarked quotation.
type calloutRenderer struct{}

// Render implements renderer.NodeRenderer for v2.
func (r *calloutRenderer) Render(w io.Writer, source []byte, n ast.Node, entering bool, rc renderer.Context) (ast.WalkStatus, error) {
	buf := w.(util.BufWriter)
	return r.renderBlockquote(buf, source, n, entering)
}

// renderBlockquote writes the wrapper for one entry or exit of a blockquote.
func (r *calloutRenderer) renderBlockquote(w util.BufWriter, _ []byte, node ast.Node, entering bool) (ast.WalkStatus, error) {
	kind, marked := nodeAttributeString(node, attributeCallout)
	if !marked {
		return writeTag(w, "blockquote", entering)
	}

	name, _ := kind.(string)
	if !entering {
		return writeTag(w, "aside", false)
	}
	_, _ = w.WriteString(`<aside class="callout callout--` + name + `" role="note">` + "\n")
	// data-no-search marks the label as decoration, so the build's search index
	// does not offer "Tip" as a matchable word.
	_, _ = w.WriteString(`<p class="callout__title" data-no-search><span class="callout__icon" aria-hidden="true">` +
		calloutIcon(name) + `</span>` + calloutTitle(name) + "</p>\n")
	return ast.WalkContinue, nil
}

// writeTag opens or closes a single tag, for the two tags this renderer emits.
func writeTag(w util.BufWriter, tag string, entering bool) (ast.WalkStatus, error) {
	if entering {
		_, _ = w.WriteString("<" + tag + ">\n")
	} else {
		_, _ = w.WriteString("</" + tag + ">\n")
	}
	return ast.WalkContinue, nil
}

// nodeAttributeString gets a string attribute from a node using v2 API.
func nodeAttributeString(node ast.Node, name string) (any, bool) {
	val, ok := node.Attribute(name)
	if !ok {
		return nil, false
	}
	return val.Value(nil), true
}

// calloutKindsText maps each canonical kind to its visible label.
var calloutLabels = map[string]string{
	"note":    "Note",
	"tip":     "Tip",
	"warning": "Warning",
	"danger":  "Danger",
}

// calloutTitle is the human label shown at the top of a callout.
func calloutTitle(kind string) string {
	if label, known := calloutLabels[kind]; known {
		return label
	}
	return "Note"
}

// calloutIcons pairs each kind with a plain-text glyph. Text keeps the callout
// readable when CSS or JavaScript fails to load, unlike an icon font or an
// inline SVG sprite.
var calloutIcons = map[string]string{
	"note":    "\u2139", // information source
	"tip":     "\u2713", // check mark
	"warning": "\u26a0", // warning sign
	"danger":  "\u2715", // multiplication x
}

// calloutIcon is the glyph shown next to a callout's label.
func calloutIcon(kind string) string {
	if icon, known := calloutIcons[kind]; known {
		return icon
	}
	return "\u2139"
}

var _ renderer.NodeRenderer[io.Writer] = (*calloutRenderer)(nil)

// calloutHTMLExtension is an html.Extension that registers the callout renderer.
// It runs after CommonMark to override the default blockquote renderer.
type calloutHTMLExtension struct{}

func (e *calloutHTMLExtension) RendererOptions(c *html.Config) []html.Option {
	return []html.Option{
		html.WithNodeRenderers(
			map[ast.NodeKind]renderer.NodeRenderer[io.Writer]{
				ast.KindBlockquote: &calloutRenderer{},
			},
		),
	}
}

// CalloutHTMLExtension returns an extension that registers the callout renderer.
func CalloutHTMLExtension() html.Extension {
	return &calloutHTMLExtension{}
}
