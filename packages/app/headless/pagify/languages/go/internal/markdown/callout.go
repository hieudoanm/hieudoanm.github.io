package markdown

import (
	"github.com/yuin/goldmark/ast"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/util"
)

// calloutRenderer replaces the marked callout blockquote's <blockquote>
// wrapper with an <aside>, so the theme can style notes, tips, warnings and
// dangers without asking authors for extra markup.
//
// Registering a renderer for a kind replaces goldmark's own, so this type also
// reproduces the default <blockquote> markup for every unmarked quotation.
type calloutRenderer struct{}

// RegisterFuncs implements renderer.NodeRenderer.
func (r *calloutRenderer) RegisterFuncs(reg renderer.NodeRendererFuncRegisterer) {
	reg.Register(ast.KindBlockquote, r.renderBlockquote)
}

// renderBlockquote writes the wrapper for one entry or exit of a blockquote.
func (r *calloutRenderer) renderBlockquote(w util.BufWriter, _ []byte, node ast.Node, entering bool) (ast.WalkStatus, error) {
	kind, marked := node.AttributeString(attributeCallout)
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
