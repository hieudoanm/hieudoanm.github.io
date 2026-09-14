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

// namedThemes are the built-in presets, in gallery order. There are exactly
// sixty-four: keep the count and each name stable so `landify themes`, the
// gallery, and the --theme flag stay correct. Add or remove via this slice.
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
	{
		Name:        "lagoon",
		Description: "Aqua-green calm with a crisp cyan secondary.",
		Theme: Theme{
			Base: "#f2faf9", Primary: "#0f766e", Secondary: "#0891b2",
			Neutral: "#4b5a58", Info: "#0369a1", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "seafoam",
		Description: "Soft foam greens with a deep sea accent.",
		Theme: Theme{
			Base: "#f4fbf8", Primary: "#10b981", Secondary: "#0891b2",
			Neutral: "#4c5e56", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "glacier",
		Description: "Pale icy blue with a slate-cobalt accent.",
		Theme: Theme{
			Base: "#f5f9fd", Primary: "#0369a1", Secondary: "#475569",
			Neutral: "#526173", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "sky",
		Description: "Bright sky-blue with azure support.",
		Theme: Theme{
			Base: "#f5f9ff", Primary: "#2563eb", Secondary: "#0ea5e9",
			Neutral: "#4e5d72", Info: "#2563eb", Warning: "#d97706",
			Success: "#16a34a", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "cobalt",
		Description: "Deep cobalt blue with warm amber highlights.",
		Theme: Theme{
			Base: "#f4f7ff", Primary: "#1d4ed8", Secondary: "#d97706",
			Neutral: "#4f5a6e", Info: "#1e40af", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "arctic",
		Description: "Cool blue-white with a glacier-teal accent.",
		Theme: Theme{
			Base: "#f7fbff", Primary: "#0e7490", Secondary: "#2563eb",
			Neutral: "#51606e", Info: "#0e7490", Warning: "#a16207",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "sapphire",
		Description: "Jewel blue with violet notes.",
		Theme: Theme{
			Base: "#f4f7fe", Primary: "#1e40af", Secondary: "#7c3aed",
			Neutral: "#4e5a70", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "teal",
		Description: "Rich teal on a pale aqua canvas.",
		Theme: Theme{
			Base: "#f2fafb", Primary: "#0d9488", Secondary: "#0e7490",
			Neutral: "#4b5a5c", Info: "#0284c7", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "emerald",
		Description: "Deep emerald with minty support.",
		Theme: Theme{
			Base: "#f3faf6", Primary: "#047857", Secondary: "#10b981",
			Neutral: "#4b5c52", Info: "#2563eb", Warning: "#d97706",
			Success: "#047857", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "jade",
		Description: "Jade green with oyster neutrals.",
		Theme: Theme{
			Base: "#f4faf8", Primary: "#0f766e", Secondary: "#4d7c0f",
			Neutral: "#4e5e57", Info: "#0369a1", Warning: "#b45309",
			Success: "#059669", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "mint",
		Description: "Cool mint with a deep evergreen accent.",
		Theme: Theme{
			Base: "#f3fbf7", Primary: "#059669", Secondary: "#0d9488",
			Neutral: "#4b5a53", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "moss",
		Description: "Organic green with ochre highlights.",
		Theme: Theme{
			Base: "#f6f8f2", Primary: "#4d7c0f", Secondary: "#a16207",
			Neutral: "#5a6050", Info: "#0369a1", Warning: "#a16207",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "fern",
		Description: "Forest-quiet greens with stone gray.",
		Theme: Theme{
			Base: "#f4f8f4", Primary: "#15803d", Secondary: "#64748b",
			Neutral: "#4f5d53", Info: "#2563eb", Warning: "#b45309",
			Success: "#16a34a", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "graphite",
		Description: "Neutral graphite with cool silver tones.",
		Theme: Theme{
			Base: "#f6f7f9", Primary: "#334155", Secondary: "#64748b",
			Neutral: "#4b5563", Info: "#0369a1", Warning: "#b45309",
			Success: "#047857", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "steel",
		Description: "Blue-gray steel with amber accents.",
		Theme: Theme{
			Base: "#f6f8fa", Primary: "#475569", Secondary: "#d97706",
			Neutral: "#526071", Info: "#0369a1", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "iron",
		Description: "Monochrome iron with a hard black accent.",
		Theme: Theme{
			Base: "#f8f8f9", Primary: "#111827", Secondary: "#6b7280",
			Neutral: "#4b5563", Info: "#2563eb", Warning: "#b45309",
			Success: "#047857", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "pearl",
		Description: "Warm pearl white with soft taupe.",
		Theme: Theme{
			Base: "#faf9f7", Primary: "#57534e", Secondary: "#a8a29e",
			Neutral: "#6b6560", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "silver",
		Description: "Cool silver with a slate-blue accent.",
		Theme: Theme{
			Base: "#f7f8fa", Primary: "#6b7280", Secondary: "#0369a1",
			Neutral: "#4e5a66", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "concrete",
		Description: "Warm concrete gray with terracotta accents.",
		Theme: Theme{
			Base: "#f7f7f6", Primary: "#a16207", Secondary: "#57534e",
			Neutral: "#5f5b55", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "indigo",
		Description: "Deep indigo with a coral flare.",
		Theme: Theme{
			Base: "#f5f5fd", Primary: "#4338ca", Secondary: "#db2777",
			Neutral: "#514f68", Info: "#4f46e5", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "violet",
		Description: "Violet with plum notes.",
		Theme: Theme{
			Base: "#f7f5fc", Primary: "#7c3aed", Secondary: "#a855f7",
			Neutral: "#57526b", Info: "#4f46e5", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "lavender",
		Description: "Pale lavender with a deep purple accent.",
		Theme: Theme{
			Base: "#f8f6fd", Primary: "#6d28d9", Secondary: "#475569",
			Neutral: "#5a5570", Info: "#4f46e5", Warning: "#b45309",
			Success: "#059669", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "orchid",
		Description: "Orchid pink-violet with a teal counterpoint.",
		Theme: Theme{
			Base: "#f9f5fb", Primary: "#a21caf", Secondary: "#0d9488",
			Neutral: "#5b5363", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "iris",
		Description: "Soft iris blues with a dark periwinkle.",
		Theme: Theme{
			Base: "#f5f6fd", Primary: "#4f46e5", Secondary: "#0e7490",
			Neutral: "#4f5468", Info: "#4338ca", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "periwinkle",
		Description: "Airy periwinkle with a slate support.",
		Theme: Theme{
			Base: "#f7f8fe", Primary: "#667eea", Secondary: "#6b7280",
			Neutral: "#4e5866", Info: "#4f46e5", Warning: "#b45309",
			Success: "#059669", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "carnation",
		Description: "Soft carnation pink with a rose accent.",
		Theme: Theme{
			Base: "#fdf6f8", Primary: "#e11d48", Secondary: "#be185d",
			Neutral: "#5f535a", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "magenta",
		Description: "Punchy magenta with a deep fuchsia.",
		Theme: Theme{
			Base: "#faf4f9", Primary: "#c026d3", Secondary: "#a21caf",
			Neutral: "#58525e", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "peony",
		Description: "Peony blush with a coral-rose accent.",
		Theme: Theme{
			Base: "#fdf5f6", Primary: "#dc4b7b", Secondary: "#fb7185",
			Neutral: "#5f5459", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "fuchsia",
		Description: "Bright fuchsia with a violet support.",
		Theme: Theme{
			Base: "#faf3fb", Primary: "#d946ef", Secondary: "#a855f7",
			Neutral: "#5c5363", Info: "#4f46e5", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "blush",
		Description: "Gentle blush neutral with a dusty rose.",
		Theme: Theme{
			Base: "#fdf6f7", Primary: "#be185d", Secondary: "#9ca3af",
			Neutral: "#65555c", Info: "#2563eb", Warning: "#c2410c",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "cherry",
		Description: "Cherry red with cream neutrals.",
		Theme: Theme{
			Base: "#fdf5f4", Primary: "#dc2626", Secondary: "#ea580c",
			Neutral: "#605254", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "crimson",
		Description: "Deep crimson with burgundy tones.",
		Theme: Theme{
			Base: "#faf3f3", Primary: "#b91c1c", Secondary: "#991b1b",
			Neutral: "#5f4f51", Info: "#0369a1", Warning: "#b45309",
			Success: "#047857", Error: "#991b1b", Radius: "10px",
		},
	},
	{
		Name:        "tomato",
		Description: "Warm tomato red with a sage support.",
		Theme: Theme{
			Base: "#fdf5f2", Primary: "#ea580c", Secondary: "#65a30d",
			Neutral: "#5d534c", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "amber",
		Description: "Amber gold with chocolate accents.",
		Theme: Theme{
			Base: "#fdf8ef", Primary: "#d97706", Secondary: "#92400e",
			Neutral: "#5f574b", Info: "#0369a1", Warning: "#b45309",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "apricot",
		Description: "Apricot warmth with a peach blush.",
		Theme: Theme{
			Base: "#fdf7f1", Primary: "#ea8c2f", Secondary: "#f59e0b",
			Neutral: "#60574f", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "tangerine",
		Description: "Bright tangerine with a citrus lime.",
		Theme: Theme{
			Base: "#fdf6ef", Primary: "#f97316", Secondary: "#65a30d",
			Neutral: "#5b544c", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "pumpkin",
		Description: "Spiced pumpkin with a cream neutral.",
		Theme: Theme{
			Base: "#faf4ec", Primary: "#c2410c", Secondary: "#92400e",
			Neutral: "#5f5448", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "gold",
		Description: "Metallic gold with an ivory neutral.",
		Theme: Theme{
			Base: "#fbf8ef", Primary: "#b45309", Secondary: "#a16207",
			Neutral: "#625a4a", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "honey",
		Description: "Honey yellow with warm brown.",
		Theme: Theme{
			Base: "#fdf9ef", Primary: "#ca8a04", Secondary: "#a16207",
			Neutral: "#5f574a", Info: "#0369a1", Warning: "#b45309",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "marigold",
		Description: "Marigold orange-gold with a rose support.",
		Theme: Theme{
			Base: "#fcf6ec", Primary: "#d97706", Secondary: "#db2777",
			Neutral: "#5f5649", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "mocha",
		Description: "Mocha brown with caramel warmth.",
		Theme: Theme{
			Base: "#f6f1ec", Primary: "#78350f", Secondary: "#a16207",
			Neutral: "#5c5045", Info: "#0369a1", Warning: "#92400e",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "coffee",
		Description: "Rich coffee brown with cream.",
		Theme: Theme{
			Base: "#f5f0ea", Primary: "#57534e", Secondary: "#a16207",
			Neutral: "#5c5349", Info: "#0369a1", Warning: "#92400e",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "caramel",
		Description: "Caramel tones with burnt sugar.",
		Theme: Theme{
			Base: "#faf3e9", Primary: "#a16207", Secondary: "#78350f",
			Neutral: "#5e554c", Info: "#0369a1", Warning: "#92400e",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "olive",
		Description: "Olive green with a warm khaki.",
		Theme: Theme{
			Base: "#f6f6ef", Primary: "#4d7c0f", Secondary: "#a16207",
			Neutral: "#575d49", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "lime",
		Description: "Lime green with deep green accents.",
		Theme: Theme{
			Base: "#f6faf1", Primary: "#65a30d", Secondary: "#15803d",
			Neutral: "#57604a", Info: "#0369a1", Warning: "#d97706",
			Success: "#4d7c0f", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "chartreuse",
		Description: "Chartreuse kick with charcoal.",
		Theme: Theme{
			Base: "#f7faf0", Primary: "#4d7c0f", Secondary: "#3f6212",
			Neutral: "#585e4c", Info: "#0369a1", Warning: "#ca8a04",
			Success: "#65a30d", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "plum",
		Description: "Deep plum with a warm berry.",
		Theme: Theme{
			Base: "#f7f2f6", Primary: "#86198f", Secondary: "#a21caf",
			Neutral: "#5b4f5d", Info: "#0369a1", Warning: "#c2410c",
			Success: "#059669", Error: "#b91c1c", Radius: "10px",
		},
	},
	{
		Name:        "wine",
		Description: "Wine red with a mauve touch.",
		Theme: Theme{
			Base: "#faf2f3", Primary: "#831843", Secondary: "#9d174d",
			Neutral: "#5f4a53", Info: "#2563eb", Warning: "#b45309",
			Success: "#059669", Error: "#991b1b", Radius: "10px",
		},
	},
	{
		Name:        "burgundy",
		Description: "Old burgundy with champagne.",
		Theme: Theme{
			Base: "#f9f2f2", Primary: "#7f1d1d", Secondary: "#92400e",
			Neutral: "#5c4d4d", Info: "#0369a1", Warning: "#b45309",
			Success: "#047857", Error: "#991b1b", Radius: "10px",
		},
	},
	{
		Name:        "noir",
		Description: "High-contrast noir white with ink.",
		Theme: Theme{
			Base: "#fafafa", Primary: "#18181b", Secondary: "#3f3f46",
			Neutral: "#52525b", Info: "#2563eb", Warning: "#b45309",
			Success: "#047857", Error: "#dc2626", Radius: "10px",
		},
	},
	{
		Name:        "eclipse",
		Description: "Near-black canvas lit by electric mint.",
		Theme: Theme{
			Base: "#09090b", Primary: "#34d399", Secondary: "#38bdf8",
			Neutral: "#d4d4d8", Info: "#38bdf8", Warning: "#fbbf24",
			Success: "#34d399", Error: "#f87171", Radius: "10px",
		},
	},
	{
		Name:        "nebula",
		Description: "Deep space with violet-cyan glows.",
		Theme: Theme{
			Base: "#0a0f1e", Primary: "#a78bfa", Secondary: "#22d3ee",
			Neutral: "#cbd5e1", Info: "#38bdf8", Warning: "#fbbf24",
			Success: "#34d399", Error: "#f87171", Radius: "10px",
		},
	},
	{
		Name:        "abyss",
		Description: "Black-blue abyss with amber sparks.",
		Theme: Theme{
			Base: "#06090f", Primary: "#f59e0b", Secondary: "#64748b",
			Neutral: "#e2e8f0", Info: "#38bdf8", Warning: "#fbbf24",
			Success: "#34d399", Error: "#f87171", Radius: "10px",
		},
	},
	{
		Name:        "obsidian",
		Description: "Obsidian slate with an ember glow.",
		Theme: Theme{
			Base: "#0c0e12", Primary: "#f97316", Secondary: "#fbbf24",
			Neutral: "#d4d4d8", Info: "#38bdf8", Warning: "#fbbf24",
			Success: "#34d399", Error: "#f87171", Radius: "10px",
		},
	},
	{
		Name:        "fog",
		Description: "Foggy blue-gray with a soft azure.",
		Theme: Theme{
			Base: "#f4f6f9", Primary: "#475569", Secondary: "#0ea5e9",
			Neutral: "#545f6e", Info: "#0ea5e9", Warning: "#f59e0b",
			Success: "#10b981", Error: "#ef4444", Radius: "10px",
		},
	},
	{
		Name:        "frost",
		Description: "Frosty white with an ice-blue accent.",
		Theme: Theme{
			Base: "#f6fafd", Primary: "#0891b2", Secondary: "#60a5fa",
			Neutral: "#4e5c6c", Info: "#2563eb", Warning: "#d97706",
			Success: "#059669", Error: "#dc2626", Radius: "10px",
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
