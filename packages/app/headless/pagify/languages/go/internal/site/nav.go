package site

import (
	"path"
	"strings"
)

// Group is one section of the sidebar: a directory of pages, optionally with
// nested groups. A group whose directory has an index page links to that page;
// otherwise it acts purely as a heading for its children.
type Group struct {
	// Title is the group's label, from its index page or the directory name.
	Title string
	// URL is the index page's URL, empty when the directory has no index page.
	URL string
	// Pages are the group's direct children that are not index pages.
	Pages Pages
	// Groups are the subdirectories one level below, in navigation order.
	Groups []*Group
}

// IsLinked reports whether the group itself is a link, rather than a heading
// that only introduces its children.
func (g *Group) IsLinked() bool {
	return g.URL != ""
}

// Nav is the full navigation tree for a site.
type Nav struct {
	// Pages are the pages at the content root, in navigation order.
	Pages Pages
	// Groups are the top-level directories, in navigation order.
	Groups []*Group
}

// Empty reports whether the navigation has nothing to show, so the theme can
// leave the sidebar out of the layout entirely.
func (n *Nav) Empty() bool {
	return len(n.Pages) == 0 && len(n.Groups) == 0
}

// BuildNav turns a flat page list into the tree the sidebar renders. A
// directory's index page becomes the group's own link; every other page in
// that directory becomes a leaf, ordered by `order` frontmatter then file name.
// Callers must pass pages already sorted, which Discover guarantees.
func BuildNav(pages Pages) *Nav {
	indexes := indexByDir(pages)
	children := map[string]Pages{}
	groups := map[string]*Group{}
	var dirs []string

	for _, page := range pages {
		if page.Dir == "." {
			continue
		}
		if _, seen := groups[page.Dir]; !seen {
			groups[page.Dir] = newGroup(page.Dir, indexes[page.Dir])
			dirs = append(dirs, page.Dir)
		}
		if !page.IsIndex() {
			children[page.Dir] = append(children[page.Dir], page)
		}
	}

	nav := &Nav{}
	for _, dir := range dirs {
		group := groups[dir]
		group.Pages = children[dir]
		group.Groups = childGroups(dir, groups, dirs)
		if !strings.Contains(dir, "/") {
			nav.Groups = append(nav.Groups, group)
		}
	}
	for _, page := range pages {
		if page.Dir == "." {
			nav.Pages = append(nav.Pages, page)
		}
	}

	sortPages(nav.Pages)
	nav.Pages = landingFirst(nav.Pages)
	return nav
}

// landingFirst moves the root landing page to the front of the root pages. It
// is the site's front door, so it belongs at the top of the sidebar rather than
// wherever its file name sorts.
func landingFirst(pages Pages) Pages {
	for i, page := range pages {
		if page.URL != "/" {
			continue
		}
		rest := make(Pages, 0, len(pages))
		rest = append(rest, page)
		rest = append(rest, pages[:i]...)
		return append(rest, pages[i+1:]...)
	}
	return pages
}

// newGroup creates the group for dir, linking it to its index page when the
// directory has one.
func newGroup(dir string, index *Page) *Group {
	group := &Group{Title: humanize(path.Base(dir))}
	if index != nil {
		group.Title = index.NavTitle()
		group.URL = index.URL
	}
	return group
}

// childGroups returns the groups nested exactly one level below dir.
func childGroups(dir string, groups map[string]*Group, dirs []string) []*Group {
	prefix := dir + "/"
	var nested []*Group
	for _, candidate := range dirs {
		if strings.HasPrefix(candidate, prefix) && !strings.Contains(strings.TrimPrefix(candidate, prefix), "/") {
			nested = append(nested, groups[candidate])
		}
	}
	return nested
}

// indexByDir maps each directory that has an index page to that page.
func indexByDir(pages Pages) map[string]*Page {
	indexes := map[string]*Page{}
	for _, page := range pages {
		if page.IsIndex() {
			indexes[page.Dir] = page
		}
	}
	return indexes
}
