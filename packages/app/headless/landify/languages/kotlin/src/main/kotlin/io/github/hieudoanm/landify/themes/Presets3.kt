package io.github.hieudoanm.landify.themes

import io.github.hieudoanm.landify.config.Theme

/**
 * Presets 21-30 in gallery order. The table is split across files only to
 * respect the 200-line file limit; concatenating [presets1]..[presets7]
 * yields the full gallery in its original order.
 */
internal fun presets3(): List<NamedTheme> = listOf(
    NamedTheme(
        name = "fern",
        description =
            "Forest-quiet greens with stone gray.",
        theme =
            Theme(
                base = "#f4f8f4",
                primary = "#15803d",
                secondary = "#64748b",
                neutral = "#4f5d53",
                info = "#2563eb",
                warning = "#b45309",
                success = "#16a34a",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "graphite",
        description =
            "Neutral graphite with cool silver tones.",
        theme =
            Theme(
                base = "#f6f7f9",
                primary = "#334155",
                secondary = "#64748b",
                neutral = "#4b5563",
                info = "#0369a1",
                warning = "#b45309",
                success = "#047857",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "steel",
        description =
            "Blue-gray steel with amber accents.",
        theme =
            Theme(
                base = "#f6f8fa",
                primary = "#475569",
                secondary = "#d97706",
                neutral = "#526071",
                info = "#0369a1",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "iron",
        description =
            "Monochrome iron with a hard black accent.",
        theme =
            Theme(
                base = "#f8f8f9",
                primary = "#111827",
                secondary = "#6b7280",
                neutral = "#4b5563",
                info = "#2563eb",
                warning = "#b45309",
                success = "#047857",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "pearl",
        description =
            "Warm pearl white with soft taupe.",
        theme =
            Theme(
                base = "#faf9f7",
                primary = "#57534e",
                secondary = "#a8a29e",
                neutral = "#6b6560",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "silver",
        description =
            "Cool silver with a slate-blue accent.",
        theme =
            Theme(
                base = "#f7f8fa",
                primary = "#6b7280",
                secondary = "#0369a1",
                neutral = "#4e5a66",
                info = "#2563eb",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "concrete",
        description =
            "Warm concrete gray with terracotta accents.",
        theme =
            Theme(
                base = "#f7f7f6",
                primary = "#a16207",
                secondary = "#57534e",
                neutral = "#5f5b55",
                info = "#0369a1",
                warning = "#ca8a04",
                success = "#65a30d",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "indigo",
        description =
            "Deep indigo with a coral flare.",
        theme =
            Theme(
                base = "#f5f5fd",
                primary = "#4338ca",
                secondary = "#db2777",
                neutral = "#514f68",
                info = "#4f46e5",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "violet",
        description =
            "Violet with plum notes.",
        theme =
            Theme(
                base = "#f7f5fc",
                primary = "#7c3aed",
                secondary = "#a855f7",
                neutral = "#57526b",
                info = "#4f46e5",
                warning = "#d97706",
                success = "#059669",
                error = "#dc2626",
                radius = "10px",
            ),
    ),
    NamedTheme(
        name = "lavender",
        description =
            "Pale lavender with a deep purple accent.",
        theme =
            Theme(
                base = "#f8f6fd",
                primary = "#6d28d9",
                secondary = "#475569",
                neutral = "#5a5570",
                info = "#4f46e5",
                warning = "#b45309",
                success = "#059669",
                error = "#b91c1c",
                radius = "10px",
            ),
    ),
)
