package io.github.hieudoanm.landify.themes

import io.github.hieudoanm.landify.config.Theme

/**
 * Presets 61-64 in gallery order. The table is split across files only to
 * respect the 200-line file limit; concatenating [presets1]..[presets7]
 * yields the full gallery in its original order.
 */
internal fun presets7(): List<NamedTheme> = listOf(
    NamedTheme(
        name = "abyss",
        description =
            "Black-blue abyss with amber sparks.",
        theme =
            Theme(
                base = "#06090f",
                primary = "#f59e0b",
                secondary = "#64748b",
                neutral = "#e2e8f0",
                info = "#38bdf8",
                warning = "#fbbf24",
                success = "#34d399",
                error = "#f87171",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "obsidian",
        description =
            "Obsidian slate with an ember glow.",
        theme =
            Theme(
                base = "#0c0e12",
                primary = "#f97316",
                secondary = "#fbbf24",
                neutral = "#d4d4d8",
                info = "#38bdf8",
                warning = "#fbbf24",
                success = "#34d399",
                error = "#f87171",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "fog",
        description =
            "Foggy blue-gray with a soft azure.",
        theme =
            Theme(
                base = "#f4f6f9",
                primary = "#475569",
                secondary = "#0ea5e9",
                neutral = "#545f6e",
                info = "#0ea5e9",
                warning = "#f59e0b",
                success = "#10b981",
                error = "#ef4444",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "frost",
        description =
            "Frosty white with an ice-blue accent.",
        theme =
            Theme(
                base = "#f6fafd",
                primary = "#0891b2",
                secondary = "#60a5fa",
                neutral = "#4e5c6c",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
)
