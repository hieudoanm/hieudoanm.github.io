package io.github.hieudoanm.landify.themes

import io.github.hieudoanm.landify.config.Theme

/**
 * Presets 51-60 in gallery order. The table is split across files only to
 * respect the 200-line file limit; concatenating [presets1]..[presets7]
 * yields the full gallery in its original order.
 */
internal fun presets6(): List<NamedTheme> = listOf(
    NamedTheme(
        name = "caramel",
        description =
            "Caramel tones with burnt sugar.",
        theme =
            Theme(
                base = "#faf3e9",
                primary = "#a16207",
                secondary = "#78350f",
                neutral = "#5e554c",
                info = "#0369a1",
                warning = "#92400e",
                success = "#65a30d",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "olive",
        description =
            "Olive green with a warm khaki.",
        theme =
            Theme(
                base = "#f6f6ef",
                primary = "#4d7c0f",
                secondary = "#a16207",
                neutral = "#575d49",
                info = "#0369a1",
                warning = "#ca8a04",
                success = "#65a30d",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "lime",
        description =
            "Lime green with deep green accents.",
        theme =
            Theme(
                base = "#f6faf1",
                primary = "#65a30d",
                secondary = "#15803d",
                neutral = "#57604a",
                info = "#0369a1",
                warning = "#d97706",
                success = "#4d7c0f",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "chartreuse",
        description =
            "Chartreuse kick with charcoal.",
        theme =
            Theme(
                base = "#f7faf0",
                primary = "#4d7c0f",
                secondary = "#3f6212",
                neutral = "#585e4c",
                info = "#0369a1",
                warning = "#ca8a04",
                success = "#65a30d",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "plum",
        description =
            "Deep plum with a warm berry.",
        theme =
            Theme(
                base = "#f7f2f6",
                primary = "#86198f",
                secondary = "#a21caf",
                neutral = "#5b4f5d",
                info = "#0369a1",
                warning = "#c2410c",
                success = "#059669",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "wine",
        description =
            "Wine red with a mauve touch.",
        theme =
            Theme(
                base = "#faf2f3",
                primary = "#831843",
                secondary = "#9d174d",
                neutral = "#5f4a53",
                info = "#2563eb",
                warning = "#b45309",
                success = "#059669",
                error = "#991b1b",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "burgundy",
        description =
            "Old burgundy with champagne.",
        theme =
            Theme(
                base = "#f9f2f2",
                primary = "#7f1d1d",
                secondary = "#92400e",
                neutral = "#5c4d4d",
                info = "#0369a1",
                warning = "#b45309",
                success = "#047857",
                error = "#991b1b",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "noir",
        description =
            "High-contrast noir white with ink.",
        theme =
            Theme(
                base = "#fafafa",
                primary = "#18181b",
                secondary = "#3f3f46",
                neutral = "#52525b",
                info = "#2563eb",
                warning = "#b45309",
                success = "#047857",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "eclipse",
        description =
            "Near-black canvas lit by electric mint.",
        theme =
            Theme(
                base = "#09090b",
                primary = "#34d399",
                secondary = "#38bdf8",
                neutral = "#d4d4d8",
                info = "#38bdf8",
                warning = "#fbbf24",
                success = "#34d399",
                error = "#f87171",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "nebula",
        description =
            "Deep space with violet-cyan glows.",
        theme =
            Theme(
                base = "#0a0f1e",
                primary = "#a78bfa",
                secondary = "#22d3ee",
                neutral = "#cbd5e1",
                info = "#38bdf8",
                warning = "#fbbf24",
                success = "#34d399",
                error = "#f87171",
                radius = "10px",
            ),
    ),
)
