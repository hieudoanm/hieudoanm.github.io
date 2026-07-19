package mcp

import (
	"encoding/json"
	"sort"
	"strings"

	"landify/internal/landify"
)

// typeDescriptions explains what each layout renders. `landify types` has to
// carry this because a model picking a page type has no other way to learn
// which one fits, and a wrong guess costs a full rewrite of the config.
var typeDescriptions = map[string]string{
	"app":       "App store listing: store badges, ratings and a portrait 9:16 screenshot gallery.",
	"docs":      "Documentation index: topic card links plus an optional code sample.",
	"download":  "Release download: version and license badges, per-OS buttons, install snippet.",
	"event":     "Event page: date and venue strip, agenda timeline, speaker grid.",
	"faq":       "FAQ: native <details> rows, no JavaScript.",
	"linktree":  "Link-in-bio: compact profile with big link cards. The only type without a hero.",
	"portfolio": "Personal portfolio: avatar, skills chips, project grid.",
	"pricing":   "Pricing table: tier cards with a highlighted most-popular plan.",
	"product":   "Product landing page: hero, features, demo video and CTA. The default type.",
	"status":    "Status page: state banner, uptime stats, incident log.",
	"team":      "Team page: values strip and member cards.",
	"waitlist":  "Waitlist capture: email form, launch date, social links.",
}

// typeEntry is one row of the types listing.
type typeEntry struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

// typesResult is the payload of the types tool.
type typesResult struct {
	Count int         `json:"count"`
	Types []typeEntry `json:"types"`
}

// themeEntry is one row of the themes listing.
type themeEntry struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

// themesResult is the payload of the themes tool.
type themesResult struct {
	Count  int          `json:"count"`
	Total  int          `json:"total"`
	Themes []themeEntry `json:"themes"`
}

// themesArgs are the arguments of the themes tool.
type themesArgs struct {
	Query string `json:"query"`
}

// handleTypes lists the supported page types with what each one renders.
func handleTypes() ToolHandler {
	return func(json.RawMessage) *ToolResult {
		known := landify.KnownTypes()
		entries := make([]typeEntry, 0, len(known))
		for _, name := range known {
			entries = append(entries, typeEntry{Name: name, Description: typeDescriptions[name]})
		}
		return NewToolResultText(marshal(typesResult{Count: len(entries), Types: entries}))
	}
}

// handleThemes lists the built-in presets, optionally filtered by a substring
// of the name or description. The catalogue is 64 entries, so an unfiltered
// listing is a lot of text for a model to read when it only wants "the dark
// ones".
func handleThemes() ToolHandler {
	return func(raw json.RawMessage) *ToolResult {
		var args themesArgs
		if err := unmarshalArgs(raw, &args); err != nil {
			return NewToolResultError(err.Error())
		}

		all := landify.Themes()
		matched := make([]themeEntry, 0, len(all))
		query := strings.ToLower(strings.TrimSpace(args.Query))
		for _, theme := range all {
			if !matchesQuery(query, theme) {
				continue
			}
			matched = append(matched, themeEntry{Name: theme.Name, Description: theme.Description})
		}
		sort.Slice(matched, func(i, j int) bool { return matched[i].Name < matched[j].Name })

		return NewToolResultText(marshal(themesResult{
			Count:  len(matched),
			Total:  len(all),
			Themes: matched,
		}))
	}
}

// matchesQuery reports whether a preset passes the filter. An empty query
// matches everything.
func matchesQuery(query string, theme landify.NamedTheme) bool {
	if query == "" {
		return true
	}
	return strings.Contains(strings.ToLower(theme.Name), query) ||
		strings.Contains(strings.ToLower(theme.Description), query)
}
