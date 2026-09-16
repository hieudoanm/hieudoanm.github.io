package gui

import (
	"sort"

	"landify/internal/landify"
)

// FieldKind describes the input widget for a form field.
type FieldKind int

const (
	FieldText   FieldKind = iota // single-line entry
	FieldArea                    // multi-line text area
	FieldSelect                  // closed dropdown
)

// Field describes one editable scalar in form mode.
type Field struct {
	Key     string // dotted yaml path, e.g. "hero.headline"
	Label   string // human-readable label
	Kind    FieldKind
	Options []string // closed choices for FieldSelect
}

// Section groups the fields and collection editors that belong to one
// logical block in the YAML (e.g. "hero", "pricing").
type Section struct {
	Key         string
	Label       string
	Fields      []Field
	Collections []string // dotted paths handled by the collections editor
}

// col holds the metadata for one reusable collection catalog entry.
type col struct {
	path    string
	label   string
	keys    []string // leaf field names
	nested  map[string]any
	scalars bool
}

var collections = []col{
	{"site.nav", "Navigation links", []string{"label", "href"}, map[string]any{"label": "", "href": ""}, false},
	{"footer.links", "Footer links", []string{"label", "href"}, map[string]any{"label": "", "href": ""}, false},
	{"features.items", "Feature cards", []string{"icon", "title", "body"}, map[string]any{"icon": "", "title": "", "body": ""}, false},
	{"pricing.tiers", "Pricing tiers", []string{"name", "price", "period", "tag", "cta.label", "cta.href"}, map[string]any{"name": "", "price": "", "period": "", "tag": "", "cta": map[string]any{"label": "", "href": ""}}, false},
	{"event.agenda", "Agenda slots", []string{"time", "title", "body", "speaker"}, map[string]any{"time": "", "title": "", "body": "", "speaker": ""}, false},
	{"event.speakers", "Speakers", []string{"name", "role", "avatar"}, map[string]any{"name": "", "role": "", "avatar": ""}, false},
	{"download.platforms", "Platforms", []string{"name", "icon", "href"}, map[string]any{"name": "", "icon": "", "href": ""}, false},
	{"team.members", "Members", []string{"name", "role", "bio", "avatar"}, map[string]any{"name": "", "role": "", "bio": "", "avatar": ""}, false},
	{"team.values", "Team values", []string{"icon", "title", "body"}, map[string]any{"icon": "", "title": "", "body": ""}, false},
	{"portfolio.skills", "Skills", []string{""}, nil, true},
	{"portfolio.projects", "Projects", []string{"icon", "title", "body", "href"}, map[string]any{"icon": "", "title": "", "body": "", "href": ""}, false},
	{"docs.packages", "Package cards", []string{"icon", "title", "body", "href"}, map[string]any{"icon": "", "title": "", "body": "", "href": ""}, false},
	{"faq.items", "FAQ rows", []string{"question", "answer"}, map[string]any{"question": "", "answer": ""}, false},
	{"app.stores", "App stores", []string{"name", "icon", "href"}, map[string]any{"name": "", "icon": "", "href": ""}, false},
	{"app.shots", "Screenshots", []string{"title", "src"}, map[string]any{"title": "", "src": ""}, false},
	{"status.stats", "Stats", []string{"label", "value"}, map[string]any{"label": "", "value": ""}, false},
	{"status.incidents", "Incidents", []string{"date", "title", "state", "body"}, map[string]any{"date": "", "title": "", "state": "", "body": ""}, false},
	{"waitlist.social", "Social links", []string{"label", "href"}, map[string]any{"label": "", "href": ""}, false},
	{"linktree.cards", "Link cards", []string{"title", "href", "icon", "note"}, map[string]any{"title": "", "href": "", "icon": "", "note": ""}, false},
	{"linktree.social", "Social links", []string{"label", "href"}, map[string]any{"label": "", "href": ""}, false},
	{"perks", "Perks", []string{""}, nil, true},
}

// CollectionPaths returns every cataloged collection path in sorted order.
func CollectionPaths() []string {
	out := make([]string, len(collections))
	for i, c := range collections {
		out[i] = c.path
	}
	sort.Strings(out)
	return out
}

func lookupCol(path string) *col {
	for i, c := range collections {
		if collections[i].path == path {
			return &c
		}
	}
	return nil
}

// CollectionLabel returns the human label for a collection path.
func CollectionLabel(path string) string {
	if c := lookupCol(path); c != nil {
		return c.label
	}
	return path
}

// CollectionKeys returns the leaf field names for a collection path.
func CollectionKeys(path string) []string {
	if c := lookupCol(path); c != nil {
		return c.keys
	}
	return nil
}

// CollectionTemplate returns the item template for add operations, or nil for
// scalar lists.
func CollectionTemplate(path string) map[string]any {
	if c := lookupCol(path); c != nil {
		return c.nested
	}
	return nil
}

// IsScalarCollection reports whether items in the path are plain strings.
func IsScalarCollection(path string) bool {
	if c := lookupCol(path); c != nil {
		return c.scalars
	}
	return false
}

// MediaHints returns rendering guidance for typ, e.g. the 16:9 asset
// requirements of the product layout. An empty slice means no special notes.
func MediaHints(typ string) []string {
	switch landify.NormalizeType(typ) {
	case "product":
		return []string{
			"product requires media: hero.image.src and demo.video.src, both rendered in the shared 16:9 frame (1280 × 720).",
			"demo.video.poster (optional) is the still shown before playback; demo.video.track points to a WebVTT captions file.",
		}
	case "app":
		return []string{
			"app screenshots use aspect-ratio 9 / 16 (portrait); provide a .src for each shot (optional).",
		}
	default:
		return nil
	}
}

// ContentSections returns the form-mode sections relevant for typ. Shared
// sections appear in every type except linktree (which replaces hero with
// its profile block).
func ContentSections(typ string) []Section {
	typ = landify.NormalizeType(typ)
	out := []Section{
		{Key: "site", Label: "Site", Fields: []Field{
			{"site.name", "Site name", FieldText, nil},
			{"site.mark", "Mark (emoji)", FieldText, nil},
			{"site.description", "Description", FieldArea, nil},
		}, Collections: []string{"site.nav"}},
		{Key: "footer", Label: "Footer", Fields: []Field{
			{"footer.copyright", "Copyright", FieldText, nil},
		}, Collections: []string{"footer.links"}},
	}
	if typ != "linktree" {
		out = append(out, Section{Key: "hero", Label: "Hero", Fields: []Field{
			{"hero.badge", "Badge (emoji)", FieldText, nil},
			{"hero.headline", "Headline", FieldText, nil},
			{"hero.subheadline", "Subheadline", FieldArea, nil},
			{"hero.primary.label", "Primary label", FieldText, nil},
			{"hero.primary.href", "Primary href", FieldText, nil},
			{"hero.secondary.label", "Secondary label", FieldText, nil},
			{"hero.secondary.href", "Secondary href", FieldText, nil},
			{"hero.image.src", "Hero image src", FieldText, nil},
			{"hero.image.alt", "Hero image alt", FieldText, nil},
		}})
	}
	out = append(out, sectionsForType(typ)...)
	return out
}

func sectionsForType(typ string) []Section {
	switch typ {
	case "waitlist":
		return []Section{
			{Key: "waitlist", Label: "Waitlist", Fields: []Field{
				{"waitlist.launches", "Launches", FieldText, nil},
				{"waitlist.heading", "Heading", FieldText, nil},
				{"waitlist.body", "Body", FieldArea, nil},
				{"waitlist.form.action", "Form action URL", FieldText, nil},
				{"waitlist.form.placeholder", "Placeholder", FieldText, nil},
				{"waitlist.form.button", "Button label", FieldText, nil},
			}, Collections: []string{"waitlist.social"}},
		}
	case "event":
		return []Section{
			{Key: "event", Label: "Event", Fields: []Field{
				{"event.date", "Date", FieldText, nil},
				{"event.time", "Time", FieldText, nil},
				{"event.venue.name", "Venue name", FieldText, nil},
				{"event.venue.city", "Venue city", FieldText, nil},
				{"event.venue.address", "Address", FieldText, nil},
				{"event.primary.label", "CTA label", FieldText, nil},
				{"event.primary.href", "CTA href", FieldText, nil},
			}, Collections: []string{"event.agenda", "event.speakers"}},
		}
	case "download":
		return []Section{
			{Key: "features", Label: "Features", Fields: []Field{
				{"features.heading", "Heading", FieldText, nil},
				{"features.sub", "Sub", FieldArea, nil},
			}, Collections: []string{"features.items"}},
			{Key: "download", Label: "Download", Fields: []Field{
				{"download.version", "Version", FieldText, nil},
				{"download.license", "License", FieldText, nil},
				{"download.repo", "Repo URL", FieldText, nil},
				{"download.install", "Install snippet", FieldArea, nil},
			}, Collections: []string{"download.platforms"}},
			ctaSection(),
		}
	case "pricing":
		return []Section{
			{Key: "pricing", Label: "Pricing", Fields: []Field{
				{"pricing.heading", "Heading", FieldText, nil},
				{"pricing.sub", "Sub", FieldArea, nil},
				{"pricing.note", "Note", FieldArea, nil},
			}, Collections: []string{"pricing.tiers"}},
		}
	case "app":
		return []Section{
			{Key: "app", Label: "App", Fields: []Field{
				{"app.ratings", "Ratings", FieldText, nil},
				{"app.reviews", "Reviews", FieldText, nil},
			}, Collections: []string{"app.stores", "app.shots"}},
		}
	case "portfolio":
		return []Section{
			{Key: "portfolio", Label: "Portfolio", Fields: []Field{
				{"portfolio.name", "Name", FieldText, nil},
				{"portfolio.role", "Role", FieldText, nil},
				{"portfolio.location", "Location", FieldText, nil},
				{"portfolio.avatar", "Avatar URL", FieldText, nil},
				{"portfolio.about", "About", FieldArea, nil},
			}, Collections: []string{"portfolio.skills", "portfolio.projects"}},
		}
	case "docs":
		return []Section{
			{Key: "docs", Label: "Docs", Fields: []Field{
				{"docs.heading", "Heading", FieldText, nil},
				{"docs.sub", "Sub", FieldArea, nil},
				{"docs.sample", "Sample code", FieldArea, nil},
			}, Collections: []string{"docs.packages"}},
		}
	case "faq":
		return []Section{
			{Key: "faq", Label: "FAQ", Fields: []Field{
				{"faq.heading", "Heading", FieldText, nil},
				{"faq.sub", "Sub", FieldArea, nil},
			}, Collections: []string{"faq.items"}},
		}
	case "team":
		return []Section{
			{Key: "team", Label: "Team", Fields: []Field{
				{"team.heading", "Heading", FieldText, nil},
				{"team.sub", "Sub", FieldArea, nil},
			}, Collections: []string{"team.values", "team.members"}},
		}
	case "status":
		return []Section{
			{Key: "status", Label: "Status", Fields: []Field{
				{"status.state", "State", FieldSelect, []string{"operational", "degraded", "outage", "maintenance"}},
				{"status.updated", "Updated", FieldText, nil},
				{"status.announcement", "Announcement", FieldArea, nil},
			}, Collections: []string{"status.stats", "status.incidents"}},
		}
	case "linktree":
		return []Section{
			{Key: "linktree", Label: "Linktree", Fields: []Field{
				{"linktree.heading", "Heading", FieldText, nil},
				{"linktree.sub", "Sub", FieldArea, nil},
				{"linktree.avatar", "Avatar URL", FieldText, nil},
			}, Collections: []string{"linktree.cards", "linktree.social"}},
		}
	default: // product
		return []Section{
			{Key: "features", Label: "Features", Fields: []Field{
				{"features.heading", "Heading", FieldText, nil},
				{"features.sub", "Sub", FieldArea, nil},
			}, Collections: []string{"features.items"}},
			{Key: "demo", Label: "Demo", Fields: []Field{
				{"demo.heading", "Heading", FieldText, nil},
				{"demo.sub", "Sub", FieldArea, nil},
				{"demo.video.src", "Video src", FieldText, nil},
				{"demo.video.poster", "Poster", FieldText, nil},
				{"demo.video.track", "Track (VTT)", FieldText, nil},
			}},
			ctaSection(),
		}
	}
}

// ctaSection returns the shared CTA section included by product and download.
func ctaSection() Section {
	return Section{Key: "cta", Label: "CTA", Fields: []Field{
		{"cta.icon", "Icon (emoji)", FieldText, nil},
		{"cta.heading", "Heading", FieldText, nil},
		{"cta.body", "Body", FieldArea, nil},
		{"cta.button.label", "Button label", FieldText, nil},
		{"cta.button.href", "Button href", FieldText, nil},
	}}
}

// ApplySectionFields sets the dotted scalar values from form edits into the
// document YAML text and returns the new YAML.
func ApplySectionFields(data string, values map[string]string) (string, error) {
	return setPathValues(data, values)
}
