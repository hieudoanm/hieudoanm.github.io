package site

import (
	"strings"
	"testing"
)

// page is a shorthand for building a page with only the fields navigation and
// link resolution care about. The title is derived the same way newPage derives
// it, so navigation labels read like the real thing.
func page(source string) *Page {
	return &Page{
		Source: source,
		Dir:    dirOf(source),
		URL:    URLForSource(source),
		Title:  titleFromSource(source),
	}
}

// dirOf returns the directory a source path lives in, as the content root's
// "." for top-level files.
func dirOf(source string) string {
	if index := strings.LastIndex(source, "/"); index >= 0 {
		return source[:index]
	}
	return "."
}

// groupTitles lists one level of group labels.
func groupTitles(groups []*Group) []string {
	titles := make([]string, 0, len(groups))
	for _, group := range groups {
		titles = append(titles, group.Title)
	}
	return titles
}

// navTitles flattens a group's own leaf pages into their nav labels.
func navTitles(group *Group) []string {
	titles := make([]string, 0, len(group.Pages))
	for _, page := range group.Pages {
		titles = append(titles, page.NavTitle())
	}
	return titles
}

// fixture builds a page list mirroring a nested documentation tree.
func fixture() Pages {
	return Pages{
		page("index.md"),
		page("guide/index.md"),
		page("guide/configuration.md"),
		page("guide/installation.md"),
		page("guide/advanced/index.md"),
		page("guide/advanced/plugins.md"),
		page("reference/cli.md"),
	}
}

func TestBuildNavGroupsDirectories(t *testing.T) {
	nav := BuildNav(fixture())

	if len(nav.Pages) != 1 || nav.Pages[0].Source != "index.md" {
		t.Fatalf("root pages = %v, want only index.md", sourcesOf(nav.Pages))
	}
	if got := groupTitles(nav.Groups); !equal(got, []string{"Guide", "Reference"}) {
		t.Errorf("group titles = %v, want [Guide Reference]", got)
	}
}

func TestBuildNavLinksGroupsToTheirIndex(t *testing.T) {
	nav := BuildNav(fixture())

	guide := nav.Groups[0]
	if guide.URL != "/guide/" {
		t.Errorf("guide URL = %q, want /guide/", guide.URL)
	}
	if !guide.IsLinked() {
		t.Error("guide IsLinked() = false, want true for a directory with an index")
	}
	if got := navTitles(guide); !equal(got, []string{"Configuration", "Installation"}) {
		t.Errorf("guide pages = %v, want [Configuration Installation]", got)
	}
}

func TestBuildNavNestsSubdirectories(t *testing.T) {
	nav := BuildNav(fixture())

	guide := nav.Groups[0]
	if len(guide.Groups) != 1 {
		t.Fatalf("guide.Groups = %d, want 1 nested group", len(guide.Groups))
	}
	advanced := guide.Groups[0]
	if advanced.URL != "/guide/advanced/" {
		t.Errorf("advanced URL = %q, want /guide/advanced/", advanced.URL)
	}
	if got := navTitles(advanced); !equal(got, []string{"Plugins"}) {
		t.Errorf("advanced pages = %v, want [Plugins]", got)
	}
}

func TestBuildNavHandlesDirectoriesWithoutAnIndex(t *testing.T) {
	nav := BuildNav(Pages{page("index.md"), page("reference/cli.md"), page("reference/api/http.md")})

	if len(nav.Groups) != 1 {
		t.Fatalf("groups = %d, want 1", len(nav.Groups))
	}
	group := nav.Groups[0]
	if group.IsLinked() {
		t.Error("group IsLinked() = true, want false when the directory has no index")
	}
	if group.URL != "" {
		t.Errorf("group URL = %q, want empty", group.URL)
	}
	if got := groupTitles(group.Groups); !equal(got, []string{"Api"}) {
		t.Errorf("nested groups = %v, want [Api]", got)
	}
}

func TestBuildNavReportsEmpty(t *testing.T) {
	if !(&Nav{}).Empty() {
		t.Error("Empty() = false for an empty navigation, want true")
	}
	if BuildNav(Pages{page("index.md")}).Empty() {
		t.Error("Empty() = true for a navigation with a page, want false")
	}
}

func TestBuildNavRespectsOrderFrontmatter(t *testing.T) {
	pages := fixture()
	first := 1
	for _, candidate := range pages {
		if candidate.Source == "guide/configuration.md" {
			candidate.Order = &first
		}
	}

	nav := BuildNav(pages)
	if got := navTitles(nav.Groups[0]); !equal(got, []string{"Configuration", "Installation"}) {
		t.Errorf("guide pages = %v, want Configuration first", got)
	}
}

func TestBuildNavPutsTheLandingPageFirst(t *testing.T) {
	pages := Pages{
		page("ARCHITECTURE.md"),
		page("CONTRIBUTING.md"),
		page("index.md"),
	}

	nav := BuildNav(pages)
	if len(nav.Pages) != 3 {
		t.Fatalf("root pages = %d, want 3", len(nav.Pages))
	}
	if nav.Pages[0].Source != "index.md" {
		t.Errorf("first root page = %q, want index.md", nav.Pages[0].Source)
	}
}

func TestBuildNavSortsFileNamesWithoutCase(t *testing.T) {
	pages := Pages{page("Zebra.md"), page("apple.md"), page("Banana.md")}

	sortPages(pages)
	want := []string{"apple.md", "Banana.md", "Zebra.md"}
	for i, source := range want {
		if pages[i].Source != source {
			t.Errorf("pages[%d] = %q, want %q", i, pages[i].Source, source)
		}
	}
}
