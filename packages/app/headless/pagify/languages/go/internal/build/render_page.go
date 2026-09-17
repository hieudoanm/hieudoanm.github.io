package build

import (
	"errors"
	"fmt"
	"strings"

	"pagify/internal/site"
	"pagify/internal/theme"
)

// ErrPageNotFound reports that a requested page URL names no page in the site.
var ErrPageNotFound = errors.New("page not found")

// RenderPage returns the HTML for the page published at urlPath (a
// site-absolute URL such as "/" or "/guide/"), without writing anything to
// disk. It performs the same discovery, navigation and theming as Build, so the
// result matches what Build would publish; an unknown urlPath reports
// ErrPageNotFound.
func RenderPage(opts Options, urlPath string) ([]byte, error) {
	_, config, selected, pages, err := loadSite(opts)
	if err != nil {
		return nil, err
	}
	nav := site.BuildNav(pages)
	wanted := normalizePagePath(urlPath)
	for _, page := range pages {
		if page.URL == wanted {
			return pageHTML(selected, config, nav, page)
		}
	}
	if wanted == "/" && !pages.HasLandingPage() {
		return landingHTML(selected, config, nav)
	}
	return nil, fmt.Errorf("%w: %q", ErrPageNotFound, urlPath)
}

// pageHTML renders one discovered page to HTML.
func pageHTML(selected *theme.Theme, config Config, nav *site.Nav, page *site.Page) ([]byte, error) {
	data := render{
		Site:       config.siteMeta(),
		Page:       pageDataFor(page),
		Navigation: navigationFor(nav, config, page.URL),
		Links:      config.assetURL,
	}
	html, err := selected.Execute(data)
	if err != nil {
		return nil, fmt.Errorf("render page %s: %w", page.Source, err)
	}
	return html, nil
}

// landingHTML renders the generated root page for content with no index of its
// own, so a visitor who opens the site never meets a 404.
func landingHTML(selected *theme.Theme, config Config, nav *site.Nav) ([]byte, error) {
	data := render{
		Site:       config.siteMeta(),
		Page:       pageData{Title: config.Title},
		Navigation: navigationFor(nav, config, ""),
		Links:      config.assetURL,
		Index:      true,
	}
	html, err := selected.Execute(data)
	if err != nil {
		return nil, fmt.Errorf("render landing page: %w", err)
	}
	return html, nil
}

// normalizePagePath canonicalises a requested page URL to the trailing-slash
// form the build publishes, so "guide" and "/guide/" name the same page.
func normalizePagePath(urlPath string) string {
	trimmed := strings.Trim(urlPath, "/")
	if trimmed == "" {
		return "/"
	}
	return "/" + trimmed + "/"
}
