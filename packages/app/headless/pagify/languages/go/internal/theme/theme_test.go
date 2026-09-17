package theme

import (
	"strings"
	"testing"
)

// stub mirrors the shape the page template expects. It lives in the test
// because the real data type is owned by the build package, which depends on
// this one rather than the other way round.
type stub struct {
	Site       stubSite
	Page       stubPage
	Navigation []stubEntry
	Links      func(name string) string
	Index      bool
}

// Asset resolves a theme asset name, as the render data does.
func (s stub) Asset(name string) string { return s.Links(name) }

type stubSite struct {
	Title    string
	Language string
	HomeURL  string
	Theme    string
	Footer   string
}

type stubPage struct {
	Title       string
	Description string
	Outline     []stubHeading
	Body        string
}

type stubHeading struct {
	Level int
	ID    string
	Text  string
}

type stubEntry struct {
	Title    string
	URL      string
	Current  bool
	Children []stubEntry
}

// testData is a site with a page, one link and one nested group, which covers
// every branch of the default template.
func testData() stub {
	return stub{
		Site: stubSite{Title: "Docs", Language: "en", HomeURL: "/", Theme: "light"},
		Page: stubPage{
			Title:       "Install",
			Description: "How to install.",
			Outline: []stubHeading{
				{Level: 1, ID: "install", Text: "Install"},
				{Level: 2, ID: "steps", Text: "Steps"},
			},
			Body: "<p>Body text.</p>",
		},
		Navigation: []stubEntry{
			{Title: "Home", URL: "/"},
			{Title: "Guide", URL: "/guide/", Children: []stubEntry{
				{Title: "Install", URL: "/guide/install/", Current: true},
			}},
		},
		Links: func(name string) string { return "/assets/" + name },
	}
}

func TestDefaultEmbedsTemplateAndAssets(t *testing.T) {
	selected, err := Default()
	if err != nil {
		t.Fatalf("Default: %v", err)
	}

	for _, name := range []string{"styles.css", "script.js", "search.js", "favicon.ico"} {
		file, err := selected.Assets().Open(name)
		if err != nil {
			t.Errorf("asset %s missing: %v", name, err)
			continue
		}
		info, err := file.Stat()
		if err != nil {
			t.Errorf("stat %s: %v", name, err)
		} else if info.Size() == 0 {
			t.Errorf("asset %s is empty", name)
		}
		_ = file.Close()
	}
}

func TestExecuteRendersThePage(t *testing.T) {
	selected, err := Default()
	if err != nil {
		t.Fatalf("Default: %v", err)
	}

	rendered, err := selected.Execute(testData())
	if err != nil {
		t.Fatalf("Execute: %v", err)
	}

	out := string(rendered)
	for _, want := range []string{
		"<!doctype html>",
		`<html lang="en"`,
		"<title>Install · Docs</title>",
		`content="How to install."`,
		`href="/assets/styles.css"`,
		`src="/assets/script.js"`,
		`href="/guide/install/"`,
		`aria-current="page"`,
		"Body text.",
		`href="#steps"`,
		"Steps",
	} {
		if !strings.Contains(out, want) {
			t.Errorf("rendered page missing %q", want)
		}
	}
}

func TestExecuteOmitsNavigationWhenEmpty(t *testing.T) {
	data := testData()
	data.Navigation = nil

	selected, err := Default()
	if err != nil {
		t.Fatalf("Default: %v", err)
	}
	rendered, err := selected.Execute(data)
	if err != nil {
		t.Fatalf("Execute: %v", err)
	}

	if out := string(rendered); strings.Contains(out, `id="sidebar"`) {
		t.Error("rendered a sidebar for a site with no navigation")
	}
}

func TestExecuteRendersTheNavigationAsTheLandingPageBody(t *testing.T) {
	data := testData()
	data.Index = true
	data.Page.Body = ""

	selected, err := Default()
	if err != nil {
		t.Fatalf("Default: %v", err)
	}
	rendered, err := selected.Execute(data)
	if err != nil {
		t.Fatalf("Execute: %v", err)
	}

	out := string(rendered)
	if !strings.Contains(out, `class="landing"`) {
		t.Errorf("landing page did not render the navigation as content:\n%s", out)
	}
}

func TestExecuteOmitsOutlineForFlatPages(t *testing.T) {
	data := testData()
	data.Page.Outline = []stubHeading{{Level: 1, ID: "install", Text: "Install"}}

	selected, err := Default()
	if err != nil {
		t.Fatalf("Default: %v", err)
	}
	rendered, err := selected.Execute(data)
	if err != nil {
		t.Fatalf("Execute: %v", err)
	}

	if out := string(rendered); strings.Contains(out, "On this page") {
		t.Error("rendered an outline for a page with no subheadings")
	}
}
