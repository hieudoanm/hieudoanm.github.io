package site

import (
	"path"
	"strings"

	"pagify/internal/markdown"
)

// Prefixer maps a site-absolute URL onto the address the site is actually
// served at. With no base path configured it is the identity function.
type Prefixer func(url string) string

// resolver rewrites destinations for one page. Pages are authored against the
// content tree — `../reference/cli.md`, `img/diagram.svg` — but published at
// trailing-slash URLs that may sit under a base path, so internal destinations
// all need converting.
type resolver struct {
	// from is the directory of the page holding the link, relative to the
	// content root.
	from string
	// pagesBySource turns a resolved source path into the page published there.
	pagesBySource map[string]*Page
	// assets holds every non-Markdown file discovered below the content root,
	// keyed by source path, so asset links can be rewritten too.
	assets map[string]bool
	// prefix applies the site's base path to generated URLs.
	prefix Prefixer
}

// newResolver returns a resolver for links written inside directory from.
func newResolver(from string, pages Pages, assets map[string][]byte, prefix Prefixer) *resolver {
	bySource := make(map[string]*Page, len(pages))
	for _, page := range pages {
		bySource[page.Source] = page
	}

	names := make(map[string]bool, len(assets))
	for name := range assets {
		names[name] = true
	}
	return &resolver{from: from, pagesBySource: bySource, assets: names, prefix: prefix}
}

// resolve implements markdown.Resolver.
func (r *resolver) resolve(destination []byte) []byte {
	raw := string(destination)
	target, fragment := splitFragment(raw)
	if target == "" || isExternal(target) {
		return destination
	}

	source := cleanSource(r.from, target)
	switch {
	case r.pagesBySource[source] != nil:
		return []byte(r.prefix(r.pagesBySource[source].URL) + fragment)
	case r.assets[source]:
		return []byte(r.prefix("/"+source) + fragment)
	}
	// The link points at nothing that was discovered. Leave it as written so
	// the broken link stays visible in the output instead of being silently
	// rewritten into a different broken link.
	return destination
}

// cleanSource turns a link destination into a path relative to the content
// root. A destination starting with "/" is resolved from the root; anything
// else is resolved from the directory holding the link.
func cleanSource(from, target string) string {
	if strings.HasPrefix(target, "/") {
		return path.Clean(strings.TrimPrefix(target, "/"))
	}
	return path.Clean(path.Join(from, target))
}

// splitFragment separates a trailing "#fragment" from a URL.
func splitFragment(raw string) (target, fragment string) {
	if index := strings.Index(raw, "#"); index >= 0 {
		return raw[:index], raw[index:]
	}
	return raw, ""
}

// isExternal reports whether a link leaves the site: it carries a URI scheme,
// is protocol-relative, or is an ordinary page URL. A root-relative path is
// still internal — authors write /guide/cli.md expecting it to become a real
// page link — so it is resolved against the content root rather than skipped.
func isExternal(target string) bool {
	return hasScheme(target) || strings.HasPrefix(target, "//")
}

// hasScheme reports whether url carries a URI scheme such as "https:" or
// "mailto:". A colon after a slash is part of a path, not a scheme, so
// "guides/ports:80" stays relative.
func hasScheme(url string) bool {
	index := strings.Index(url, ":")
	if index <= 0 || strings.ContainsAny(url[:index], "/?#") {
		return false
	}
	for i, r := range url[:index] {
		switch {
		case r >= 'a' && r <= 'z', r >= 'A' && r <= 'Z':
		case i > 0 && (r >= '0' && r <= '9' || r == '+' || r == '-' || r == '.'):
		default:
			return false
		}
	}
	return true
}

// ResolverFor hands back the link resolver for a page's source directory. The
// build calls it once per page; resolvers are cached so pages sharing a
// directory share one lookup table.
type ResolverFor func(dir string) markdown.Resolver

// LinkResolverFor returns resolvers bound to pages and assets, so destinations
// written against the content tree are rewritten onto published URLs.
func LinkResolverFor(pages Pages, assets map[string][]byte, prefix Prefixer) ResolverFor {
	cache := map[string]*resolver{}
	return func(dir string) markdown.Resolver {
		found, ok := cache[dir]
		if !ok {
			found = newResolver(dir, pages, assets, prefix)
			cache[dir] = found
		}
		return found.resolve
	}
}
