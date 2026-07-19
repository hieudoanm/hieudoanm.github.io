//! Built-in theme presets (gallery data — generated from the Go source).
//!
//! There are exactly sixty-four presets in gallery order. Keep the count and
//! each name stable so `landify themes`, the gallery, and the `--theme` flag
//! stay correct.

use crate::config::Theme;

/// A stable name and one-line description paired with a complete color
/// preset. Choose one with `landify build --theme <name>`; the preset replaces
/// the `theme:` section of the YAML.
#[derive(Debug, Clone)]
pub struct NamedTheme {
    pub name: &'static str,
    pub description: &'static str,
    pub theme: Theme,
}

/// Returns every built-in theme preset in gallery order.
pub fn named_themes() -> Vec<NamedTheme> {
    vec![
        NamedTheme {
            name: "ocean",
            description: "Cool blue-cyan accent on a misty slate canvas.",
            theme: Theme {
                base: "#f4f7fb".to_string(),
                primary: "#0e7490".to_string(),
                secondary: "#2563eb".to_string(),
                neutral: "#475569".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#16a34a".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "forest",
            description: "Moss-and-pine greens with a warm leaf accent.",
            theme: Theme {
                base: "#f5faf5".to_string(),
                primary: "#15803d".to_string(),
                secondary: "#4d7c0f".to_string(),
                neutral: "#4d5c4f".to_string(),
                info: "#0f766e".to_string(),
                warning: "#b45309".to_string(),
                success: "#16a34a".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "sunset",
            description: "Warm orange-to-rose glow for bold branding.",
            theme: Theme {
                base: "#fff7f0".to_string(),
                primary: "#ea580c".to_string(),
                secondary: "#db2777".to_string(),
                neutral: "#6b5a50".to_string(),
                info: "#0e7490".to_string(),
                warning: "#d97706".to_string(),
                success: "#16a34a".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "royal",
            description: "Violet-led palette with a teal counterpoint.",
            theme: Theme {
                base: "#f6f4fb".to_string(),
                primary: "#6d28d9".to_string(),
                secondary: "#0d9488".to_string(),
                neutral: "#5b546a".to_string(),
                info: "#4f46e5".to_string(),
                warning: "#d97706".to_string(),
                success: "#16a34a".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "rose",
            description: "Soft blush neutrals with a deep pink accent.",
            theme: Theme {
                base: "#fdf4f5".to_string(),
                primary: "#be185d".to_string(),
                secondary: "#9d174d".to_string(),
                neutral: "#6b5560".to_string(),
                info: "#4f46e5".to_string(),
                warning: "#c2410c".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "slate",
            description: "Monochrome graphite with a blue-tinted coolness.",
            theme: Theme {
                base: "#f8fafc".to_string(),
                primary: "#1e293b".to_string(),
                secondary: "#475569".to_string(),
                neutral: "#64748b".to_string(),
                info: "#0ea5e9".to_string(),
                warning: "#f59e0b".to_string(),
                success: "#10b981".to_string(),
                error: "#ef4444".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "sand",
            description: "Warm clay and golden-ochre earthy palette.",
            theme: Theme {
                base: "#faf7f0".to_string(),
                primary: "#a16207".to_string(),
                secondary: "#b45309".to_string(),
                neutral: "#6f6559".to_string(),
                info: "#0e7490".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "midnight",
            description: "Inverted dark canvas lit by cyan and violet.",
            theme: Theme {
                base: "#0f172a".to_string(),
                primary: "#22d3ee".to_string(),
                secondary: "#a78bfa".to_string(),
                neutral: "#cbd5e1".to_string(),
                info: "#38bdf8".to_string(),
                warning: "#fbbf24".to_string(),
                success: "#34d399".to_string(),
                error: "#f87171".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "lagoon",
            description: "Aqua-green calm with a crisp cyan secondary.",
            theme: Theme {
                base: "#f2faf9".to_string(),
                primary: "#0f766e".to_string(),
                secondary: "#0891b2".to_string(),
                neutral: "#4b5a58".to_string(),
                info: "#0369a1".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "seafoam",
            description: "Soft foam greens with a deep sea accent.",
            theme: Theme {
                base: "#f4fbf8".to_string(),
                primary: "#10b981".to_string(),
                secondary: "#0891b2".to_string(),
                neutral: "#4c5e56".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "glacier",
            description: "Pale icy blue with a slate-cobalt accent.",
            theme: Theme {
                base: "#f5f9fd".to_string(),
                primary: "#0369a1".to_string(),
                secondary: "#475569".to_string(),
                neutral: "#526173".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "sky",
            description: "Bright sky-blue with azure support.",
            theme: Theme {
                base: "#f5f9ff".to_string(),
                primary: "#2563eb".to_string(),
                secondary: "#0ea5e9".to_string(),
                neutral: "#4e5d72".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#16a34a".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "cobalt",
            description: "Deep cobalt blue with warm amber highlights.",
            theme: Theme {
                base: "#f4f7ff".to_string(),
                primary: "#1d4ed8".to_string(),
                secondary: "#d97706".to_string(),
                neutral: "#4f5a6e".to_string(),
                info: "#1e40af".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "arctic",
            description: "Cool blue-white with a glacier-teal accent.",
            theme: Theme {
                base: "#f7fbff".to_string(),
                primary: "#0e7490".to_string(),
                secondary: "#2563eb".to_string(),
                neutral: "#51606e".to_string(),
                info: "#0e7490".to_string(),
                warning: "#a16207".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "sapphire",
            description: "Jewel blue with violet notes.",
            theme: Theme {
                base: "#f4f7fe".to_string(),
                primary: "#1e40af".to_string(),
                secondary: "#7c3aed".to_string(),
                neutral: "#4e5a70".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "teal",
            description: "Rich teal on a pale aqua canvas.",
            theme: Theme {
                base: "#f2fafb".to_string(),
                primary: "#0d9488".to_string(),
                secondary: "#0e7490".to_string(),
                neutral: "#4b5a5c".to_string(),
                info: "#0284c7".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "emerald",
            description: "Deep emerald with minty support.",
            theme: Theme {
                base: "#f3faf6".to_string(),
                primary: "#047857".to_string(),
                secondary: "#10b981".to_string(),
                neutral: "#4b5c52".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#047857".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "jade",
            description: "Jade green with oyster neutrals.",
            theme: Theme {
                base: "#f4faf8".to_string(),
                primary: "#0f766e".to_string(),
                secondary: "#4d7c0f".to_string(),
                neutral: "#4e5e57".to_string(),
                info: "#0369a1".to_string(),
                warning: "#b45309".to_string(),
                success: "#059669".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "mint",
            description: "Cool mint with a deep evergreen accent.",
            theme: Theme {
                base: "#f3fbf7".to_string(),
                primary: "#059669".to_string(),
                secondary: "#0d9488".to_string(),
                neutral: "#4b5a53".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "moss",
            description: "Organic green with ochre highlights.",
            theme: Theme {
                base: "#f6f8f2".to_string(),
                primary: "#4d7c0f".to_string(),
                secondary: "#a16207".to_string(),
                neutral: "#5a6050".to_string(),
                info: "#0369a1".to_string(),
                warning: "#a16207".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "fern",
            description: "Forest-quiet greens with stone gray.",
            theme: Theme {
                base: "#f4f8f4".to_string(),
                primary: "#15803d".to_string(),
                secondary: "#64748b".to_string(),
                neutral: "#4f5d53".to_string(),
                info: "#2563eb".to_string(),
                warning: "#b45309".to_string(),
                success: "#16a34a".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "graphite",
            description: "Neutral graphite with cool silver tones.",
            theme: Theme {
                base: "#f6f7f9".to_string(),
                primary: "#334155".to_string(),
                secondary: "#64748b".to_string(),
                neutral: "#4b5563".to_string(),
                info: "#0369a1".to_string(),
                warning: "#b45309".to_string(),
                success: "#047857".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "steel",
            description: "Blue-gray steel with amber accents.",
            theme: Theme {
                base: "#f6f8fa".to_string(),
                primary: "#475569".to_string(),
                secondary: "#d97706".to_string(),
                neutral: "#526071".to_string(),
                info: "#0369a1".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "iron",
            description: "Monochrome iron with a hard black accent.",
            theme: Theme {
                base: "#f8f8f9".to_string(),
                primary: "#111827".to_string(),
                secondary: "#6b7280".to_string(),
                neutral: "#4b5563".to_string(),
                info: "#2563eb".to_string(),
                warning: "#b45309".to_string(),
                success: "#047857".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "pearl",
            description: "Warm pearl white with soft taupe.",
            theme: Theme {
                base: "#faf9f7".to_string(),
                primary: "#57534e".to_string(),
                secondary: "#a8a29e".to_string(),
                neutral: "#6b6560".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "silver",
            description: "Cool silver with a slate-blue accent.",
            theme: Theme {
                base: "#f7f8fa".to_string(),
                primary: "#6b7280".to_string(),
                secondary: "#0369a1".to_string(),
                neutral: "#4e5a66".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "concrete",
            description: "Warm concrete gray with terracotta accents.",
            theme: Theme {
                base: "#f7f7f6".to_string(),
                primary: "#a16207".to_string(),
                secondary: "#57534e".to_string(),
                neutral: "#5f5b55".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "indigo",
            description: "Deep indigo with a coral flare.",
            theme: Theme {
                base: "#f5f5fd".to_string(),
                primary: "#4338ca".to_string(),
                secondary: "#db2777".to_string(),
                neutral: "#514f68".to_string(),
                info: "#4f46e5".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "violet",
            description: "Violet with plum notes.",
            theme: Theme {
                base: "#f7f5fc".to_string(),
                primary: "#7c3aed".to_string(),
                secondary: "#a855f7".to_string(),
                neutral: "#57526b".to_string(),
                info: "#4f46e5".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "lavender",
            description: "Pale lavender with a deep purple accent.",
            theme: Theme {
                base: "#f8f6fd".to_string(),
                primary: "#6d28d9".to_string(),
                secondary: "#475569".to_string(),
                neutral: "#5a5570".to_string(),
                info: "#4f46e5".to_string(),
                warning: "#b45309".to_string(),
                success: "#059669".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "orchid",
            description: "Orchid pink-violet with a teal counterpoint.",
            theme: Theme {
                base: "#f9f5fb".to_string(),
                primary: "#a21caf".to_string(),
                secondary: "#0d9488".to_string(),
                neutral: "#5b5363".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "iris",
            description: "Soft iris blues with a dark periwinkle.",
            theme: Theme {
                base: "#f5f6fd".to_string(),
                primary: "#4f46e5".to_string(),
                secondary: "#0e7490".to_string(),
                neutral: "#4f5468".to_string(),
                info: "#4338ca".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "periwinkle",
            description: "Airy periwinkle with a slate support.",
            theme: Theme {
                base: "#f7f8fe".to_string(),
                primary: "#667eea".to_string(),
                secondary: "#6b7280".to_string(),
                neutral: "#4e5866".to_string(),
                info: "#4f46e5".to_string(),
                warning: "#b45309".to_string(),
                success: "#059669".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "carnation",
            description: "Soft carnation pink with a rose accent.",
            theme: Theme {
                base: "#fdf6f8".to_string(),
                primary: "#e11d48".to_string(),
                secondary: "#be185d".to_string(),
                neutral: "#5f535a".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "magenta",
            description: "Punchy magenta with a deep fuchsia.",
            theme: Theme {
                base: "#faf4f9".to_string(),
                primary: "#c026d3".to_string(),
                secondary: "#a21caf".to_string(),
                neutral: "#58525e".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "peony",
            description: "Peony blush with a coral-rose accent.",
            theme: Theme {
                base: "#fdf5f6".to_string(),
                primary: "#dc4b7b".to_string(),
                secondary: "#fb7185".to_string(),
                neutral: "#5f5459".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "fuchsia",
            description: "Bright fuchsia with a violet support.",
            theme: Theme {
                base: "#faf3fb".to_string(),
                primary: "#d946ef".to_string(),
                secondary: "#a855f7".to_string(),
                neutral: "#5c5363".to_string(),
                info: "#4f46e5".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "blush",
            description: "Gentle blush neutral with a dusty rose.",
            theme: Theme {
                base: "#fdf6f7".to_string(),
                primary: "#be185d".to_string(),
                secondary: "#9ca3af".to_string(),
                neutral: "#65555c".to_string(),
                info: "#2563eb".to_string(),
                warning: "#c2410c".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "cherry",
            description: "Cherry red with cream neutrals.",
            theme: Theme {
                base: "#fdf5f4".to_string(),
                primary: "#dc2626".to_string(),
                secondary: "#ea580c".to_string(),
                neutral: "#605254".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "crimson",
            description: "Deep crimson with burgundy tones.",
            theme: Theme {
                base: "#faf3f3".to_string(),
                primary: "#b91c1c".to_string(),
                secondary: "#991b1b".to_string(),
                neutral: "#5f4f51".to_string(),
                info: "#0369a1".to_string(),
                warning: "#b45309".to_string(),
                success: "#047857".to_string(),
                error: "#991b1b".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "tomato",
            description: "Warm tomato red with a sage support.",
            theme: Theme {
                base: "#fdf5f2".to_string(),
                primary: "#ea580c".to_string(),
                secondary: "#65a30d".to_string(),
                neutral: "#5d534c".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "amber",
            description: "Amber gold with chocolate accents.",
            theme: Theme {
                base: "#fdf8ef".to_string(),
                primary: "#d97706".to_string(),
                secondary: "#92400e".to_string(),
                neutral: "#5f574b".to_string(),
                info: "#0369a1".to_string(),
                warning: "#b45309".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "apricot",
            description: "Apricot warmth with a peach blush.",
            theme: Theme {
                base: "#fdf7f1".to_string(),
                primary: "#ea8c2f".to_string(),
                secondary: "#f59e0b".to_string(),
                neutral: "#60574f".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "tangerine",
            description: "Bright tangerine with a citrus lime.",
            theme: Theme {
                base: "#fdf6ef".to_string(),
                primary: "#f97316".to_string(),
                secondary: "#65a30d".to_string(),
                neutral: "#5b544c".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "pumpkin",
            description: "Spiced pumpkin with a cream neutral.",
            theme: Theme {
                base: "#faf4ec".to_string(),
                primary: "#c2410c".to_string(),
                secondary: "#92400e".to_string(),
                neutral: "#5f5448".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "gold",
            description: "Metallic gold with an ivory neutral.",
            theme: Theme {
                base: "#fbf8ef".to_string(),
                primary: "#b45309".to_string(),
                secondary: "#a16207".to_string(),
                neutral: "#625a4a".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "honey",
            description: "Honey yellow with warm brown.",
            theme: Theme {
                base: "#fdf9ef".to_string(),
                primary: "#ca8a04".to_string(),
                secondary: "#a16207".to_string(),
                neutral: "#5f574a".to_string(),
                info: "#0369a1".to_string(),
                warning: "#b45309".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "marigold",
            description: "Marigold orange-gold with a rose support.",
            theme: Theme {
                base: "#fcf6ec".to_string(),
                primary: "#d97706".to_string(),
                secondary: "#db2777".to_string(),
                neutral: "#5f5649".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "mocha",
            description: "Mocha brown with caramel warmth.",
            theme: Theme {
                base: "#f6f1ec".to_string(),
                primary: "#78350f".to_string(),
                secondary: "#a16207".to_string(),
                neutral: "#5c5045".to_string(),
                info: "#0369a1".to_string(),
                warning: "#92400e".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "coffee",
            description: "Rich coffee brown with cream.",
            theme: Theme {
                base: "#f5f0ea".to_string(),
                primary: "#57534e".to_string(),
                secondary: "#a16207".to_string(),
                neutral: "#5c5349".to_string(),
                info: "#0369a1".to_string(),
                warning: "#92400e".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "caramel",
            description: "Caramel tones with burnt sugar.",
            theme: Theme {
                base: "#faf3e9".to_string(),
                primary: "#a16207".to_string(),
                secondary: "#78350f".to_string(),
                neutral: "#5e554c".to_string(),
                info: "#0369a1".to_string(),
                warning: "#92400e".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "olive",
            description: "Olive green with a warm khaki.",
            theme: Theme {
                base: "#f6f6ef".to_string(),
                primary: "#4d7c0f".to_string(),
                secondary: "#a16207".to_string(),
                neutral: "#575d49".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "lime",
            description: "Lime green with deep green accents.",
            theme: Theme {
                base: "#f6faf1".to_string(),
                primary: "#65a30d".to_string(),
                secondary: "#15803d".to_string(),
                neutral: "#57604a".to_string(),
                info: "#0369a1".to_string(),
                warning: "#d97706".to_string(),
                success: "#4d7c0f".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "chartreuse",
            description: "Chartreuse kick with charcoal.",
            theme: Theme {
                base: "#f7faf0".to_string(),
                primary: "#4d7c0f".to_string(),
                secondary: "#3f6212".to_string(),
                neutral: "#585e4c".to_string(),
                info: "#0369a1".to_string(),
                warning: "#ca8a04".to_string(),
                success: "#65a30d".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "plum",
            description: "Deep plum with a warm berry.",
            theme: Theme {
                base: "#f7f2f6".to_string(),
                primary: "#86198f".to_string(),
                secondary: "#a21caf".to_string(),
                neutral: "#5b4f5d".to_string(),
                info: "#0369a1".to_string(),
                warning: "#c2410c".to_string(),
                success: "#059669".to_string(),
                error: "#b91c1c".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "wine",
            description: "Wine red with a mauve touch.",
            theme: Theme {
                base: "#faf2f3".to_string(),
                primary: "#831843".to_string(),
                secondary: "#9d174d".to_string(),
                neutral: "#5f4a53".to_string(),
                info: "#2563eb".to_string(),
                warning: "#b45309".to_string(),
                success: "#059669".to_string(),
                error: "#991b1b".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "burgundy",
            description: "Old burgundy with champagne.",
            theme: Theme {
                base: "#f9f2f2".to_string(),
                primary: "#7f1d1d".to_string(),
                secondary: "#92400e".to_string(),
                neutral: "#5c4d4d".to_string(),
                info: "#0369a1".to_string(),
                warning: "#b45309".to_string(),
                success: "#047857".to_string(),
                error: "#991b1b".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "noir",
            description: "High-contrast noir white with ink.",
            theme: Theme {
                base: "#fafafa".to_string(),
                primary: "#18181b".to_string(),
                secondary: "#3f3f46".to_string(),
                neutral: "#52525b".to_string(),
                info: "#2563eb".to_string(),
                warning: "#b45309".to_string(),
                success: "#047857".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "eclipse",
            description: "Near-black canvas lit by electric mint.",
            theme: Theme {
                base: "#09090b".to_string(),
                primary: "#34d399".to_string(),
                secondary: "#38bdf8".to_string(),
                neutral: "#d4d4d8".to_string(),
                info: "#38bdf8".to_string(),
                warning: "#fbbf24".to_string(),
                success: "#34d399".to_string(),
                error: "#f87171".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "nebula",
            description: "Deep space with violet-cyan glows.",
            theme: Theme {
                base: "#0a0f1e".to_string(),
                primary: "#a78bfa".to_string(),
                secondary: "#22d3ee".to_string(),
                neutral: "#cbd5e1".to_string(),
                info: "#38bdf8".to_string(),
                warning: "#fbbf24".to_string(),
                success: "#34d399".to_string(),
                error: "#f87171".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "abyss",
            description: "Black-blue abyss with amber sparks.",
            theme: Theme {
                base: "#06090f".to_string(),
                primary: "#f59e0b".to_string(),
                secondary: "#64748b".to_string(),
                neutral: "#e2e8f0".to_string(),
                info: "#38bdf8".to_string(),
                warning: "#fbbf24".to_string(),
                success: "#34d399".to_string(),
                error: "#f87171".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "obsidian",
            description: "Obsidian slate with an ember glow.",
            theme: Theme {
                base: "#0c0e12".to_string(),
                primary: "#f97316".to_string(),
                secondary: "#fbbf24".to_string(),
                neutral: "#d4d4d8".to_string(),
                info: "#38bdf8".to_string(),
                warning: "#fbbf24".to_string(),
                success: "#34d399".to_string(),
                error: "#f87171".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "fog",
            description: "Foggy blue-gray with a soft azure.",
            theme: Theme {
                base: "#f4f6f9".to_string(),
                primary: "#475569".to_string(),
                secondary: "#0ea5e9".to_string(),
                neutral: "#545f6e".to_string(),
                info: "#0ea5e9".to_string(),
                warning: "#f59e0b".to_string(),
                success: "#10b981".to_string(),
                error: "#ef4444".to_string(),
                radius: "10px".to_string(),
            },
        },
        NamedTheme {
            name: "frost",
            description: "Frosty white with an ice-blue accent.",
            theme: Theme {
                base: "#f6fafd".to_string(),
                primary: "#0891b2".to_string(),
                secondary: "#60a5fa".to_string(),
                neutral: "#4e5c6c".to_string(),
                info: "#2563eb".to_string(),
                warning: "#d97706".to_string(),
                success: "#059669".to_string(),
                error: "#dc2626".to_string(),
                radius: "10px".to_string(),
            },
        },
    ]
}

/// Resolves `name` (case-insensitive) to its `Theme`.
pub fn theme_by_name(name: &str) -> Option<Theme> {
    named_themes()
        .into_iter()
        .find(|t| t.name.eq_ignore_ascii_case(name))
        .map(|t| t.theme)
}

/// Returns the theme names in alphabetical order, for messages and docs.
pub fn theme_names() -> Vec<String> {
    let mut names: Vec<String> = named_themes()
        .into_iter()
        .map(|t| t.name.to_string())
        .collect();
    names.sort();
    names
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn exactly_sixty_four_presets() {
        assert_eq!(named_themes().len(), 64);
    }

    #[test]
    fn names_are_unique() {
        let mut names: Vec<&str> = named_themes().iter().map(|t| t.name).collect();
        let len = names.len();
        names.sort_unstable();
        names.dedup();
        assert_eq!(names.len(), len);
    }

    #[test]
    fn names_are_sorted_for_messages() {
        let names = theme_names();
        let mut sorted = names.clone();
        sorted.sort();
        assert_eq!(names, sorted);
    }

    #[test]
    fn theme_by_name_is_case_insensitive() {
        assert!(theme_by_name("MIDNIGHT").is_some());
        assert!(theme_by_name("no-such-theme").is_none());
    }

    #[test]
    fn midnight_is_dark() {
        assert_eq!(theme_by_name("midnight").unwrap().base, "#0f172a");
    }

    #[test]
    fn every_preset_has_a_default_radius() {
        for t in named_themes() {
            assert_eq!(t.theme.radius, "10px", "theme {}", t.name);
        }
    }
}
