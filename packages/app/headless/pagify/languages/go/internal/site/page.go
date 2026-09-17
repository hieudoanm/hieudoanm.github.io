package site

import (
	"path"
	"slices"
	"sort"
	"strings"

	"pagify/internal/markdown"
)

// Page is one Markdown file, resolved into everything the templates need.
type Page struct {
	// Source is the path relative to the content root, e.g. "guide/install.md".
	Source string
	// URL is where the page is published, e.g. "/guide/install/".
	URL string
	// Output is the HTML file path relative to the output directory.
	Output string
	// Title is the frontmatter title, the leading heading, or one derived from
	// the file name, in that order of preference.
	Title string
	// TitleFromHeading records that Title came from the document's leading
	// heading, so a later source can take precedence over it.
	TitleFromHeading bool
	// Description is the frontmatter description, used for meta tags and as
	// the page subtitle. May be empty.
	Description string
	// Label overrides Title in navigation only, for a shorter sidebar entry.
	Label string
	// Order pins a page's position among its siblings. Nil sorts by file name.
	Order *int
	// Content is the Markdown body, with any frontmatter already removed.
	Content []byte
	// HTML is the rendered body, filled in by the build.
	HTML string
	// Outline lists the page's headings for the on-page table of contents.
	Outline markdown.Outline
	// Dir is the directory Source lives in, used to resolve relative links.
	Dir string
}

// NavTitle is the text shown for the page in navigation.
func (p *Page) NavTitle() string {
	if p.Label != "" {
		return p.Label
	}
	return p.Title
}

// AdoptHeadingTitle uses the page's leading heading as its title unless the
// author already supplied one. Call it once the Markdown has been rendered,
// because only rendering reveals whether the document opens with a heading.
func (p *Page) AdoptHeadingTitle(heading string) {
	if heading == "" || !p.TitleFromHeading {
		return
	}
	p.Title = heading
}

// IsIndex reports whether the page is the landing page of its directory, which
// decides whether it contributes a navigation group rather than a leaf link.
func (p *Page) IsIndex() bool {
	trimmed := strings.TrimSuffix(p.Source, markdownExt(p.Source))
	return path.Base(trimmed) == indexBase || strings.EqualFold(trimmed, readmeStem)
}

// Pages is an ordered collection of pages.
type Pages []*Page

// HasLandingPage reports whether the collection includes the site's root URL.
// Content with no index page still needs one, or the site answers its own home
// address with a 404.
func (p Pages) HasLandingPage() bool {
	return slices.ContainsFunc(p, func(page *Page) bool { return page.URL == "/" })
}

// newPage resolves one content file into a Page, splitting its frontmatter and
// keeping the Markdown body for the renderer.
func newPage(source string, raw []byte) (*Page, error) {
	fm, body, _, err := markdown.SplitFrontmatter(raw)
	if err != nil {
		return nil, err
	}
	return &Page{
		Source:           source,
		URL:              URLForSource(source),
		Output:           OutputPathForSource(source),
		Title:            fm.TitleOr(titleFromSource(source)),
		TitleFromHeading: fm.Title == "",
		Description:      fm.Description,
		Label:            fm.Label,
		Order:            fm.Order,
		Content:          body,
		Dir:              path.Dir(source),
	}, nil
}

// sortPages orders pages for navigation: an explicit `order` wins, then file
// name. The sort is stable, so pages sharing an order keep discovery order and
// the generated navigation stays reproducible.
func sortPages(pages Pages) {
	sort.SliceStable(pages, func(i, j int) bool {
		left, right := pages[i], pages[j]
		switch {
		case left.Order != nil && right.Order != nil:
			if *left.Order != *right.Order {
				return *left.Order < *right.Order
			}
		case left.Order != nil:
			return true
		case right.Order != nil:
			return false
		}
		// Compared without case, so ARCHITECTURE.md does not sort ahead of
		// index.md purely because uppercase letters come first in ASCII.
		leftName, rightName := strings.ToLower(left.Source), strings.ToLower(right.Source)
		return leftName < rightName
	})
}
