package build

import (
	"fmt"
	"html/template"
	"path"

	"pagify/internal/markdown"
	"pagify/internal/site"
	"pagify/internal/theme"
)

// render is the data handed to the page template. It is deliberately separate
// from site.Page: the template needs trusted HTML, a flattened navigation and
// resolved asset URLs, none of which belong in the content model.
type render struct {
	Site       siteMeta
	Page       pageData
	Navigation navigation
	Links      linkResolver
	// Index marks the generated landing page, whose content is the navigation
	// rather than a Markdown body.
	Index bool
}

// linkResolver resolves theme asset names to URLs usable from any page depth.
// It is a named func type rather than a bare func field because the template
// package calls methods, never struct fields.
type linkResolver func(name string) string

// Asset resolves a theme asset name against the site's base path.
func (r render) Asset(name string) string {
	return r.Links(name)
}

// siteMeta is the per-site information shown in the chrome.
type siteMeta struct {
	Title    string
	Language string
	HomeURL  string
	Theme    string
	Footer   string
}

// pageData is one page's content as the template consumes it.
type pageData struct {
	Title       string
	Description string
	Outline     markdown.Outline
	Body        template.HTML
}

// navEntry is one item in the recursive navigation tree. An entry with a URL is
// a link; without one it is a heading introducing its children.
type navEntry struct {
	Title    string
	URL      string
	Current  bool
	Children []navEntry
}

// navigation is the sidebar tree for the page being rendered.
type navigation []navEntry

// writePages renders and writes every page, plus a landing page when the
// content has none. Rendering must happen before any page is written because
// each page embeds the full navigation.
func writePages(outputDir string, selected *theme.Theme, config Config, pages site.Pages) error {
	nav := site.BuildNav(pages)
	for _, page := range pages {
		data := render{
			Site:       config.siteMeta(),
			Page:       pageDataFor(page),
			Navigation: navigationFor(nav, config, page.URL),
			Links:      config.assetURL,
		}
		html, err := selected.Execute(data)
		if err != nil {
			return fmt.Errorf("render page %s: %w", page.Source, err)
		}
		if err := writeFile(outputDir, page.Output, html); err != nil {
			return err
		}
	}
	return writeLandingPage(outputDir, selected, config, nav, pages)
}

// writeLandingPage generates the site's root URL from the navigation when the
// content has no index page of its own, so a visitor who opens the site never
// meets a 404.
func writeLandingPage(outputDir string, selected *theme.Theme, config Config, nav *site.Nav, pages site.Pages) error {
	if pages.HasLandingPage() {
		return nil
	}
	data := render{
		Site:       config.siteMeta(),
		Page:       pageData{Title: config.Title},
		Navigation: navigationFor(nav, config, ""),
		Links:      config.assetURL,
		Index:      true,
	}
	html, err := selected.Execute(data)
	if err != nil {
		return fmt.Errorf("render landing page: %w", err)
	}
	return writeFile(outputDir, site.OutputPathForSource(landingSource), html)
}

// landingSource is the file name the generated root page stands in for, so it
// is written through the same output-path rule as every other page.
const landingSource = "index.md"

// siteMeta projects the config onto what the template displays.
func (c Config) siteMeta() siteMeta {
	return siteMeta{
		Title:    c.Title,
		Language: c.Language,
		HomeURL:  c.url("/"),
		Theme:    c.Theme,
		Footer:   c.Footer,
	}
}

// assetURL resolves a theme asset name to a link usable from any page depth.
// The result is root-relative, because pages live at varying depths and a
// document-relative URL would break from every page but one.
func (c Config) assetURL(name string) string {
	return c.url("/" + path.Join(theme.AssetDir, name))
}

// url prefixes a site-absolute URL with the configured base path.
func (c Config) url(target string) string {
	return c.prefix(target)
}

// prefix applies the base path to a site-absolute URL. It doubles as the
// link resolver handed to the Markdown package, so every generated URL in the
// output passes through exactly one implementation.
func (c Config) prefix(target string) string {
	if c.BasePath == "" {
		return target
	}
	if target == "/" {
		return c.BasePath + "/"
	}
	return c.BasePath + target
}

// pageDataFor projects one page onto the template's view of it. The rendered
// HTML came out of goldmark, which escaped it as it parsed, so it is marked
// trusted rather than escaped a second time.
func pageDataFor(page *site.Page) pageData {
	return pageData{
		Title:       page.Title,
		Description: page.Description,
		Outline:     page.Outline,
		Body:        template.HTML(page.HTML),
	}
}

// navigationFor flattens the navigation tree for one page, flagging the entry
// matching that page so the sidebar can mark the current location. URLs are
// resolved through config so the sidebar points at the same addresses the
// content links do.
func navigationFor(nav *site.Nav, config Config, current string) navigation {
	if nav.Empty() {
		return nil
	}
	entries := make(navigation, 0, len(nav.Pages)+len(nav.Groups))
	for _, page := range nav.Pages {
		entries = append(entries, linkEntry(page, config, current))
	}
	for _, group := range nav.Groups {
		entries = append(entries, groupEntry(group, config, current))
	}
	return entries
}

// groupEntry converts one navigation group and recurses into its children.
func groupEntry(group *site.Group, config Config, current string) navEntry {
	entry := navEntry{Title: group.Title, Current: group.URL != "" && group.URL == current}
	if group.IsLinked() {
		entry.URL = config.url(group.URL)
	}
	for _, page := range group.Pages {
		entry.Children = append(entry.Children, linkEntry(page, config, current))
	}
	for _, nested := range group.Groups {
		entry.Children = append(entry.Children, groupEntry(nested, config, current))
	}
	return entry
}

// linkEntry converts one page into a navigation link.
func linkEntry(page *site.Page, config Config, current string) navEntry {
	return navEntry{
		Title:   page.NavTitle(),
		URL:     config.url(page.URL),
		Current: page.URL == current,
	}
}
