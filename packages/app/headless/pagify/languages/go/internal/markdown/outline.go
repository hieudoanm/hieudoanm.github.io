package markdown

import (
	"strings"

	"github.com/yuin/goldmark/v2/ast"
)

// Heading is one entry in a page outline.
type Heading struct {
	Level int    // 1-6, as written in the Markdown
	ID    string // anchor target, matching the id goldmark emits on the element
	Text  string // plain-text label, used as the link text in the navigation
}

// Outline is the ordered list of headings in a document.
type Outline []Heading

// heading builds an Outline entry from a heading node. source is the original
// Markdown, needed to resolve the text segments goldmark stores as offsets.
func heading(node *ast.Heading, source []byte) Heading {
	return Heading{
		Level: node.Level,
		ID:    headingID(node),
		Text:  headingText(node, source),
	}
}

// headingID reads the anchor goldmark generated for the heading. The ID is
// stored in the node's attributes.
func headingID(node *ast.Heading) string {
	val, ok := node.Attribute("id")
	if !ok {
		return ""
	}
	return val.Value(nil)
}

// headingText flattens a heading's inline children into plain text, so
// `**bold** heading` reads as "bold heading" in the navigation.
func headingText(node *ast.Heading, source []byte) string {
	var label strings.Builder
	appendText(&label, node, source)
	return strings.TrimSpace(label.String())
}

// appendText walks inline children collecting the text a reader would see,
// following goldmark's soft line breaks inside a heading.
func appendText(label *strings.Builder, node ast.Node, source []byte) {
	for child := node.FirstChild(); child != nil; child = child.NextSibling() {
		switch n := child.(type) {
		case *ast.Text:
			label.Write(n.Value.Bytes(source))
			if n.SoftLineBreak() || n.HardLineBreak() {
				label.WriteByte(' ')
			}
		case *ast.CodeSpan:
			label.Write(n.Value.Bytes(source))
		default:
			// Emphasis, links, images and extensions carry no text of their
			// own; recurse so nested markup still contributes its words.
			appendText(label, child, source)
		}
	}
}
