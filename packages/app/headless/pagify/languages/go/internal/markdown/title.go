package markdown

import (
	"github.com/yuin/goldmark/ast"
)

// titleHeadingLevel is the heading level a document title is taken from. A
// leading level-1 heading is the conventional way to title a page.
const titleHeadingLevel = 1

// takeLeadingTitle removes the document's opening level-1 heading from the AST
// and returns its text.
//
// The theme renders the page title in its own header, so leaving the heading in
// the body would print it twice. Removing it here also keeps the generated
// outline from repeating the title above the table of contents. Only a heading
// that is the very first block qualifies, so a page that opens with an
// introduction keeps its heading levels untouched.
func takeLeadingTitle(doc *ast.Document, source []byte) string {
	first := doc.FirstChild()
	heading, ok := first.(*ast.Heading)
	if !ok || heading.Level != titleHeadingLevel {
		return ""
	}
	title := headingText(heading, source)
	doc.RemoveChild(doc, heading)
	return title
}
