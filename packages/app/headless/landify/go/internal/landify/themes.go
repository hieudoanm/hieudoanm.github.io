package landify

import (
	"sort"
	"strings"
)

// NamedTheme pairs a stable name and one-line description with a complete
// color preset. Choose one with `landify build --theme <name>`; the preset
// replaces the `theme:` section of the YAML.
type NamedTheme struct {
	Name        string
	Description string
	Theme       Theme
}

// namedThemes are the built-in presets, in gallery order.
var namedThemes = []NamedTheme{
	{
		Name:        "ocean",
		Description: "Cool blue-cyan accent on a misty slate canvas.",
		Theme: Theme{
			Base: "#f4f7fb", Primary: "#0e7490", Secondary: "#2563eb",
			Neutral: "#475569", Info: "#2563eb", Warning: "#d97706",
			Success: "#16a34a", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "forest",
		Description: "Moss-and-pine greens with a warm leaf accent.",
		Theme: Theme{
			Base: "#f5faf5", Primary: "#15803d", Secondary: "#4d7c0f",
			Neutral: "#4d5c4f", Info: "#0f766e", Warning: "#b45309",
			Success: "#16a34a", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "sunset",
		Description: "Warm orange-to-rose glow for bold branding.",
		Theme: Theme{
			Base: "#fff7f0", Primary: "#ea580c", Secondary: "#db2777",
			Neutral: "#6b5a50", Info: "#0e7490", Warning: "#d97706",
			Success: "#16a34a", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "royal",
		Description: "Violet-led palette with a teal counterpoint.",
		Theme: Theme{
			Base: "#f6f4fb", Primary: "#6d28d9", Secondary: "#0d9488",
			Neutral: "#5b546a", Info: "#4f46e5", Warning: "#d97706",
			Success: "#16a34a", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "rose",
		Description: "Soft blush neutrals with a deep pink accent.",
		Theme: Theme{
			Base: "#fdf4f5", Primary: "#be185d", Secondary: "#9d174d",
			Neutral: "#6b5560", Info: "#4f46e5", Warning: "#c2410c",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "slate",
		Description: "Monochrome graphite with a blue-tinted coolness.",
		Theme: Theme{
			Base: "#f8fafc", Primary: "#1e293b", Secondary: "#475569",
			Neutral: "#64748b", Info: "#0ea5e9", Warning: "#f59e0b",
			Success: "#10b981", Error: "#ef4444", Radius: "10px",
		},
	},
	{
		Name:        "sand",
		Description: "Warm clay and golden-ochre earthy palette.",
		Theme: Theme{
			Base: "#faf7f0", Primary: "#a16207", Secondary: "#b45309",
			Neutral: "#6f6559", Info: "#0e7490", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "midnight",
		Description: "Inverted dark canvas lit by cyan and violet.",
		Theme: Theme{
			Base: "#0f172a", Primary: "#22d3ee", Secondary: "#a78bfa",
			Neutral: "#cbd5e1", Info: "#38bdf8", Warning: "#fbbf24",
			Success: "#34d399", Error: "#f87171", Radius: "10px",
		},
	},
}

// Themes returns every built-in named theme in gallery order.
func Themes() []NamedTheme {
	out := make([]NamedTheme, len(namedThemes))
	copy(out, namedThemes)
	return out
}

// ThemeByName resolves name (case-insensitive) to its Theme.
func ThemeByName(name string) (Theme, bool) {
	for _, nt := range namedThemes {
		if strings.EqualFold(nt.Name, name) {
			return nt.Theme, true
		}
	}
	return Theme{}, false
}

// ThemeNames returns the names in alphabetical order, for messages and docs.
func ThemeNames() []string {
	names := make([]string, 0, len(namedThemes))
	for _, nt := range namedThemes {
		names = append(names, nt.Name)
	}
	sort.Strings(names)
	return names
}
