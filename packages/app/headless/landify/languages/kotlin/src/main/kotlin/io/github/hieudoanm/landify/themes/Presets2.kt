package io.github.hieudoanm.landify.themes

import io.github.hieudoanm.landify.config.Theme

/**
 * Presets 11-20 in gallery order. The table is split across files only to
 * respect the 200-line file limit; concatenating [presets1]..[presets7]
 * yields the full gallery in its original order.
 */
internal fun presets2(): List<NamedTheme> = listOf(
    NamedTheme(
        name = "glacier",
        description =
            "Pale icy blue with a slate-cobalt accent.",
        theme =
            Theme(
                base = "#f5f9fd",
                primary = "#0369a1",
                secondary = "#475569",
                neutral = "#526173",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "sky",
        description =
            "Bright sky-blue with azure support.",
        theme =
            Theme(
                base = "#f5f9ff",
                primary = "#2563eb",
                secondary = "#0ea5e9",
                neutral = "#4e5d72",
                info = "#2563eb",
                warning = "#d97706",
                success = "#16a34a",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "cobalt",
        description =
            "Deep cobalt blue with warm amber highlights.",
        theme =
            Theme(
                base = "#f4f7ff",
                primary = "#1d4ed8",
                secondary = "#d97706",
                neutral = "#4f5a6e",
                info = "#1e40af",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "arctic",
        description =
            "Cool blue-white with a glacier-teal accent.",
        theme =
            Theme(
                base = "#f7fbff",
                primary = "#0e7490",
                secondary = "#2563eb",
                neutral = "#51606e",
                info = "#0e7490",
                warning = "#a16207",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "sapphire",
        description =
            "Jewel blue with violet notes.",
        theme =
            Theme(
                base = "#f4f7fe",
                primary = "#1e40af",
                secondary = "#7c3aed",
                neutral = "#4e5a70",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "teal",
        description =
            "Rich teal on a pale aqua canvas.",
        theme =
            Theme(
                base = "#f2fafb",
                primary = "#0d9488",
                secondary = "#0e7490",
                neutral = "#4b5a5c",
                info = "#0284c7",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "emerald",
        description =
            "Deep emerald with minty support.",
        theme =
            Theme(
                base = "#f3faf6",
                primary = "#047857",
                secondary = "#10b981",
                neutral = "#4b5c52",
                info = "#2563eb",
                warning = "#d97706",
                success = "#047857",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "jade",
        description =
            "Jade green with oyster neutrals.",
        theme =
            Theme(
                base = "#f4faf8",
                primary = "#0f766e",
                secondary = "#4d7c0f",
                neutral = "#4e5e57",
                info = "#0369a1",
                warning = "#b45309",
                success = "#059669",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "mint",
        description =
            "Cool mint with a deep evergreen accent.",
        theme =
            Theme(
                base = "#f3fbf7",
                primary = "#059669",
                secondary = "#0d9488",
                neutral = "#4b5a53",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "moss",
        description =
            "Organic green with ochre highlights.",
        theme =
            Theme(
                base = "#f6f8f2",
                primary = "#4d7c0f",
                secondary = "#a16207",
                neutral = "#5a6050",
                info = "#0369a1",
                warning = "#a16207",
                success = "#65a30d",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
)
