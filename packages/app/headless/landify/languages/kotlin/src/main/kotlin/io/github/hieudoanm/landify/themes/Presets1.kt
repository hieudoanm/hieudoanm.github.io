package io.github.hieudoanm.landify.themes

import io.github.hieudoanm.landify.config.Theme

/**
 * Presets 1-10 in gallery order. The table is split across files only to
 * respect the 200-line file limit; concatenating [presets1]..[presets7]
 * yields the full gallery in its original order.
 */
internal fun presets1(): List<NamedTheme> = listOf(
    NamedTheme(
        name = "ocean",
        description =
            "Cool blue-cyan accent on a misty slate canvas.",
        theme =
            Theme(
                base = "#f4f7fb",
                primary = "#0e7490",
                secondary = "#2563eb",
                neutral = "#475569",
                info = "#2563eb",
                warning = "#d97706",
                success = "#16a34a",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "forest",
        description =
            "Moss-and-pine greens with a warm leaf accent.",
        theme =
            Theme(
                base = "#f5faf5",
                primary = "#15803d",
                secondary = "#4d7c0f",
                neutral = "#4d5c4f",
                info = "#0f766e",
                warning = "#b45309",
                success = "#16a34a",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "sunset",
        description =
            "Warm orange-to-rose glow for bold branding.",
        theme =
            Theme(
                base = "#fff7f0",
                primary = "#ea580c",
                secondary = "#db2777",
                neutral = "#6b5a50",
                info = "#0e7490",
                warning = "#d97706",
                success = "#16a34a",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "royal",
        description =
            "Violet-led palette with a teal counterpoint.",
        theme =
            Theme(
                base = "#f6f4fb",
                primary = "#6d28d9",
                secondary = "#0d9488",
                neutral = "#5b546a",
                info = "#4f46e5",
                warning = "#d97706",
                success = "#16a34a",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "rose",
        description =
            "Soft blush neutrals with a deep pink accent.",
        theme =
            Theme(
                base = "#fdf4f5",
                primary = "#be185d",
                secondary = "#9d174d",
                neutral = "#6b5560",
                info = "#4f46e5",
                warning = "#c2410c",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "slate",
        description =
            "Monochrome graphite with a blue-tinted coolness.",
        theme =
            Theme(
                base = "#f8fafc",
                primary = "#1e293b",
                secondary = "#475569",
                neutral = "#64748b",
                info = "#0ea5e9",
                warning = "#f59e0b",
                success = "#10b981",
                error = "#ef4444",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "sand",
        description =
            "Warm clay and golden-ochre earthy palette.",
        theme =
            Theme(
                base = "#faf7f0",
                primary = "#a16207",
                secondary = "#b45309",
                neutral = "#6f6559",
                info = "#0e7490",
                warning = "#ca8a04",
                success = "#65a30d",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "midnight",
        description =
            "Inverted dark canvas lit by cyan and violet.",
        theme =
            Theme(
                base = "#0f172a",
                primary = "#22d3ee",
                secondary = "#a78bfa",
                neutral = "#cbd5e1",
                info = "#38bdf8",
                warning = "#fbbf24",
                success = "#34d399",
                error = "#f87171",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "lagoon",
        description =
            "Aqua-green calm with a crisp cyan secondary.",
        theme =
            Theme(
                base = "#f2faf9",
                primary = "#0f766e",
                secondary = "#0891b2",
                neutral = "#4b5a58",
                info = "#0369a1",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "seafoam",
        description =
            "Soft foam greens with a deep sea accent.",
        theme =
            Theme(
                base = "#f4fbf8",
                primary = "#10b981",
                secondary = "#0891b2",
                neutral = "#4c5e56",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
)
