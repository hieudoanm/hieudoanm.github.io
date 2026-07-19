package io.github.hieudoanm.landify.themes

import io.github.hieudoanm.landify.color.tokens
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ThemesTest {
    @Test
    fun `every preset is present exactly once, in gallery order`() {
        val names = themes().map { it.name }
        assertEquals(GALLERY_ORDER, names)
        assertEquals(names.size, names.toSet().size, "duplicate preset name")
    }

    @Test
    fun `spot-checked primaries match the upstream table`() {
        for ((name, primary) in SPOT_CHECKED_PRIMARIES) {
            assertEquals(primary, themeByName(name)?.primary, "theme $name primary")
        }
    }

    @Test
    fun `lookup is case-insensitive`() {
        for (preset in themes()) {
            assertNotNull(themeByName(preset.name.uppercase()), "uppercase ${preset.name}")
            assertNotNull(themeByName(preset.name.lowercase()), "lowercase ${preset.name}")
        }
    }

    @Test
    fun `an unknown name resolves to nothing`() {
        assertNull(themeByName("not-a-theme"))
    }

    @Test
    fun `every preset derives a full token set`() {
        for (preset in themes()) {
            val derived = tokens(preset.theme).toMap()
            assertTrue(derived.isNotEmpty(), "no tokens for ${preset.name}")
            for (key in REQUIRED_TOKENS) {
                assertTrue(derived.getValue(key).isNotEmpty(), "${preset.name} is missing $key")
            }
        }
    }
}

/** The upstream gallery order, so a reordering is caught like a rename. */
private val GALLERY_ORDER = listOf(
    "ocean", "forest", "sunset", "royal", "rose", "slate", "sand", "midnight",
    "lagoon", "seafoam", "glacier", "sky", "cobalt", "arctic", "sapphire", "teal",
    "emerald", "jade", "mint", "moss", "fern", "graphite", "steel", "iron",
    "pearl", "silver", "concrete", "indigo", "violet", "lavender", "orchid", "iris",
    "periwinkle", "carnation", "magenta", "peony", "fuchsia", "blush", "cherry", "crimson",
    "tomato", "amber", "apricot", "tangerine", "pumpkin", "gold", "honey", "marigold",
    "mocha", "coffee", "caramel", "olive", "lime", "chartreuse", "plum", "wine",
    "burgundy", "noir", "eclipse", "nebula", "abyss", "obsidian", "fog", "frost",
)

/** A sample of the upstream table, covering light, dark, and warm families. */
private val SPOT_CHECKED_PRIMARIES = mapOf(
    "ocean" to "#0e7490",
    "forest" to "#15803d",
    "sunset" to "#ea580c",
    "royal" to "#6d28d9",
    "rose" to "#be185d",
    "slate" to "#1e293b",
    "sand" to "#a16207",
    "midnight" to "#22d3ee",
)

private val REQUIRED_TOKENS = listOf(
    "base-100", "base-200", "base-300", "base-content",
    "primary", "primary-dark", "primary-soft", "primary-content",
    "secondary", "secondary-content", "neutral", "neutral-faint",
    "border", "border-soft", "info", "warning", "success", "error", "radius",
)
