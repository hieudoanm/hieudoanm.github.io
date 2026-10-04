// Package site discovers Markdown content, models it as pages, and derives the
// navigation tree and the URLs the static build publishes each page at.
package site

import (
	"path"
	"strings"
	"unicode"
)

// indexBase is the file stem that maps a directory to its landing page.
const indexBase = "index"

// readmeStem is the alternate landing-page stem, so a repository whose docs
// live in a README publish that README at the site root.
const readmeStem = "readme"

// markdownExts are the file extensions treated as Markdown content, longest
// first so ".markdown" is not mistaken for ".md".
var markdownExts = []string{".markdown", ".md"}

// URLForSource maps a slash-separated path relative to the content root onto
// the URL the build publishes it at. Pages get trailing-slash URLs so they
// resolve on any static host without rewrite rules.
//
//	README.md             -> /
//	guide/index.md        -> /guide/
//	guide/installation.md -> /guide/installation/
func URLForSource(source string) string {
	base := strings.TrimSuffix(strings.TrimPrefix(source, "/"), "/")
	trimmed := strings.TrimSuffix(base, markdownExt(base))

	switch {
	case path.Base(trimmed) == indexBase:
		// guide/index.md -> /guide/
		dir := path.Dir(trimmed)
		if dir == "." {
			return "/"
		}
		return "/" + dir + "/"
	case strings.EqualFold(trimmed, readmeStem):
		// README.md -> /, because a repository's README is its front page.
		return "/"
	}
	if trimmed == "" {
		return "/"
	}
	return "/" + trimmed + "/"
}

// OutputPathForSource maps a content path onto the HTML file the build writes,
// relative to the output directory.
//
//	README.md             -> index.html
//	guide/installation.md -> guide/installation/index.html
func OutputPathForSource(source string) string {
	url := strings.TrimPrefix(URLForSource(source), "/")
	if url == "" {
		return "index.html"
	}
	return path.Join(url, "index.html")
}

// markdownExt returns the Markdown extension of source, or "" when the path
// does not name a Markdown file.
func markdownExt(source string) string {
	for _, ext := range markdownExts {
		if strings.HasSuffix(source, ext) {
			return ext
		}
	}
	return ""
}

// isMarkdown reports whether source names a Markdown file.
func isMarkdown(source string) bool {
	return markdownExt(source) != ""
}

// titleFromSource derives a readable title from a file path, so a page with no
// frontmatter still reads "Installation" rather than "installation".
func titleFromSource(source string) string {
	base := path.Base(strings.TrimSuffix(source, markdownExt(source)))
	if base != indexBase {
		return humanize(base)
	}
	dir := path.Dir(source)
	if dir == "." || dir == "/" {
		return "Home"
	}
	return humanize(path.Base(dir))
}

// humanize turns a kebab- or snake-cased slug into a title-cased phrase.
func humanize(slug string) string {
	words := strings.FieldsFunc(slug, isSlugSeparator)
	for i, word := range words {
		runes := []rune(word)
		runes[0] = unicode.ToUpper(runes[0])
		words[i] = string(runes)
	}
	if len(words) == 0 {
		return slug
	}
	return strings.Join(words, " ")
}

// isSlugSeparator reports whether r splits a slug into words.
func isSlugSeparator(r rune) bool {
	return r == '-' || r == '_'
}
