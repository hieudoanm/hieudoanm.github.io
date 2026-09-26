package io.github.hieudoanm.landify.themes

import io.github.hieudoanm.landify.config.Theme

/**
 * Presets 31-40 in gallery order. The table is split across files only to
 * respect the 200-line file limit; concatenating [presets1]..[presets7]
 * yields the full gallery in its original order.
 */
internal fun presets4(): List<NamedTheme> = listOf(
    NamedTheme(
        name = "orchid",
        description =
            "Orchid pink-violet with a teal counterpoint.",
        theme =
            Theme(
                base = "#f9f5fb",
                primary = "#a21caf",
                secondary = "#0d9488",
                neutral = "#5b5363",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "iris",
        description =
            "Soft iris blues with a dark periwinkle.",
        theme =
            Theme(
                base = "#f5f6fd",
                primary = "#4f46e5",
                secondary = "#0e7490",
                neutral = "#4f5468",
                info = "#4338ca",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "periwinkle",
        description =
            "Airy periwinkle with a slate support.",
        theme =
            Theme(
                base = "#f7f8fe",
                primary = "#667eea",
                secondary = "#6b7280",
                neutral = "#4e5866",
                info = "#4f46e5",
                warning = "#b45309",
                success = "#059669",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "carnation",
        description =
            "Soft carnation pink with a rose accent.",
        theme =
            Theme(
                base = "#fdf6f8",
                primary = "#e11d48",
                secondary = "#be185d",
                neutral = "#5f535a",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "magenta",
        description =
            "Punchy magenta with a deep fuchsia.",
        theme =
            Theme(
                base = "#faf4f9",
                primary = "#c026d3",
                secondary = "#a21caf",
                neutral = "#58525e",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "peony",
        description =
            "Peony blush with a coral-rose accent.",
        theme =
            Theme(
                base = "#fdf5f6",
                primary = "#dc4b7b",
                secondary = "#fb7185",
                neutral = "#5f5459",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "fuchsia",
        description =
            "Bright fuchsia with a violet support.",
        theme =
            Theme(
                base = "#faf3fb",
                primary = "#d946ef",
                secondary = "#a855f7",
                neutral = "#5c5363",
                info = "#4f46e5",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "blush",
        description =
            "Gentle blush neutral with a dusty rose.",
        theme =
            Theme(
                base = "#fdf6f7",
                primary = "#be185d",
                secondary = "#9ca3af",
                neutral = "#65555c",
                info = "#2563eb",
                warning = "#c2410c",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "cherry",
        description =
            "Cherry red with cream neutrals.",
        theme =
            Theme(
                base = "#fdf5f4",
                primary = "#dc2626",
                secondary = "#ea580c",
                neutral = "#605254",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "crimson",
        description =
            "Deep crimson with burgundy tones.",
        theme =
            Theme(
                base = "#faf3f3",
                primary = "#b91c1c",
                secondary = "#991b1b",
                neutral = "#5f4f51",
                info = "#0369a1",
                warning = "#b45309",
                success = "#047857",
                error = "#991b1b",
                radius = "10px",
            ),
    ),
)
