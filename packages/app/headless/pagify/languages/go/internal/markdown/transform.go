package markdown

import (
	"strings"

	"github.com/yuin/goldmark/v2/ast"
	"github.com/yuin/goldmark/v2/parser"
	"github.com/yuin/goldmark/v2/text"
)

// attributeCallout stores the callout kind (note, tip, warning, danger) on a
// blockquote written in the GitHub style: `> [!NOTE]`.
const attributeCallout = "pagify-callout"

// calloutKinds maps every accepted callout label to one of the four kinds the
// theme styles. Aliases let authors use whichever word reads best.
var calloutKinds = map[string]string{
	"note":      "note",
	"info":      "note",
	"tip":       "tip",
	"success":   "tip",
	"check":     "tip",
	"warning":   "warning",
	"caution":   "warning",
	"attention": "warning",
	"danger":    "danger",
	"error":     "danger",
}

// transform rewrites a parsed document in place. One walk does three jobs:
// collect the heading outline, rewrite link and image destinations through the
// caller-supplied resolver, and mark callout blockquotes.
type transform struct {
	source  []byte
	resolve func(destination []byte) []byte
	outline Outline
}

// newTransform returns a transform for one document. resolve may be nil, in
// which case destinations are left untouched.
func newTransform(source []byte, resolve func([]byte) []byte) *transform {
	return &transform{source: source, resolve: resolve}
}

// Transform implements goldmark's ASTTransformer. goldmark calls it once per
// parsed document, after the block and inline passes, which is exactly when
// headings already carry their generated ids.
//
// It is called explicitly from Render rather than registered with the parser,
// because the resolver and the collected outline differ per document while the
// Renderer itself is shared.
func (t *transform) Transform(doc *ast.Document, _ text.Reader, _ parser.Context) {
	_ = ast.Walk(doc, func(node ast.Node, entering bool) (ast.WalkStatus, error) {
		if entering {
			t.visit(node)
		}
		return ast.WalkContinue, nil
	})
}

// visit applies every per-node rewrite. Callers guarantee entering=true.
func (t *transform) visit(node ast.Node) {
	switch n := node.(type) {
	case *ast.Heading:
		t.outline = append(t.outline, heading(n, t.source))
	case *ast.Link:
		dest := n.Destination.Bytes(t.source)
		n.Destination = text.NewSingleLineValue(t.destination(dest), text.IdentityDecoder)
	case *ast.Image:
		dest := n.Destination.Bytes(t.source)
		n.Destination = text.NewSingleLineValue(t.destination(dest), text.IdentityDecoder)
	case *ast.Blockquote:
		if kind, ok := t.callout(n); ok {
			n.SetAttribute(attributeCallout, text.NewMultiLineValue(kind, text.IdentityDecoder))
		}
	}
}

// destination runs a destination through the resolver, if one was supplied.
func (t *transform) destination(destination []byte) []byte {
	if t.resolve == nil {
		return destination
	}
	return t.resolve(destination)
}

// calloutMarker is the opening token of a GitHub-style callout.
const calloutMarker = "[!"

// callout reports whether node is a `> [!KIND]` blockquote and returns the
// canonical kind.
//
// goldmark's inline parser splits `[!NOTE]` into three text nodes ("[", "!NOTE",
// "]") because the bracket looks like a link reference, so the marker is
// matched across nodes rather than within one. Those nodes are then removed so
// the marker never reaches the rendered output.
func (t *transform) callout(node *ast.Blockquote) (string, bool) {
	paragraph, ok := node.FirstChild().(*ast.Paragraph)
	if !ok {
		return "", false
	}
	marker, ok := t.findCallout(paragraph)
	kind, known := calloutKinds[marker.label]
	if !known {
		return "", false
	}
	stripCallout(marker, t.source)
	return kind, true
}

// calloutMatch locates a `[!KIND]` marker at the start of a paragraph.
type calloutMatch struct {
	// label is the lowercased word between the brackets.
	label string
	// nodes are the text nodes the marker was split across.
	nodes []*ast.Text
	// tail is how many bytes to drop from the start of the final node.
	tail int
}

// findCallout reads a paragraph's leading text nodes looking for a callout
// marker. It reports false unless the paragraph opens with exactly `[!KIND]`.
func (t *transform) findCallout(paragraph *ast.Paragraph) (calloutMatch, bool) {
	var match calloutMatch
	var marker strings.Builder

	for child := paragraph.FirstChild(); child != nil; child = child.NextSibling() {
		textNode, ok := child.(*ast.Text)
		if !ok {
			break
		}
		// The marker is matched across nodes, but it is trimmed one node at a
		// time, so remember where the current node begins within the marker.
		offset := marker.Len()
		match.nodes = append(match.nodes, textNode)
		marker.Write(textNode.Value.Bytes(t.source))

		if label, end, done := parseCalloutMarker(marker.String()); done {
			match.label, match.tail = label, end-offset
			return match, true
		}
		// Give up once the marker is longer than any real callout kind, so a
		// paragraph that merely starts with "[" cannot scan its whole body.
		if marker.Len() > maxCalloutMarker {
			break
		}
	}
	return calloutMatch{}, false
}

// maxCalloutMarker bounds how much leading text is inspected for a marker.
const maxCalloutMarker = 32

// parseCalloutMarker extracts the kind from a partial marker string, plus the
// number of bytes the marker occupies. It reports done only on the closing
// bracket, so a kind split across text nodes still resolves, and it ignores
// anything after the bracket so inline content survives.
func parseCalloutMarker(marker string) (label string, end int, done bool) {
	if !strings.HasPrefix(marker, calloutMarker) {
		return "", 0, false
	}
	close := strings.Index(marker, "]")
	if close < 0 {
		return "", 0, false
	}
	return strings.ToLower(strings.TrimSpace(marker[len(calloutMarker):close])), close + 1, true
}

// stripCallout removes the matched marker. Nodes fully covered by it are
// unlinked; a final node holding inline content after the bracket is trimmed.
func stripCallout(match calloutMatch, source []byte) {
	for _, node := range match.nodes[:len(match.nodes)-1] {
		node.Parent().RemoveChild(node)
	}
	last := match.nodes[len(match.nodes)-1]
	// Create a new SingleLineValue with the trimmed content
	newBytes := last.Value.Bytes(source)[match.tail:]
	trimmed := strings.TrimLeft(string(newBytes), " \t\n\r")
	last.Value = text.NewSingleLineValue(trimmed, text.IdentityDecoder)
}
