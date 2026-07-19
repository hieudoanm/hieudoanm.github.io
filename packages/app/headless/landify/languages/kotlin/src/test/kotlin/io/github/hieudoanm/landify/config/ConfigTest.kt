package io.github.hieudoanm.landify.config

import io.github.hieudoanm.landify.VALID_DOC
import io.github.hieudoanm.landify.color.tokens
import io.github.hieudoanm.landify.validate.errors
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class ConfigTest {
    @Test
    fun `load returns the parsed document`() {
        val config = loadYaml(VALID_DOC)
        assertEquals("Landify", config.site.name)
        assertEquals(1, config.features.items.size)
        assertTrue(errors(config).isEmpty(), "got ${errors(config)}")
    }

    @Test
    fun `theme defaults fill missing fields`() {
        val theme = loadYaml(VALID_DOC).theme
        assertEquals("#0d9488", theme.primary, "theme.primary")
        assertEquals("#f7f8fa", theme.base, "theme.base")
        assertEquals("10px", theme.radius, "theme.radius")
    }

    @Test
    fun `every derived token is non-empty`() {
        val derived = tokens(loadYaml(VALID_DOC).theme).toMap()
        for (key in EXPECTED_TOKENS) {
            assertTrue(derived.getValue(key).isNotEmpty(), "tokens[$key] is empty")
        }
    }

    @Test
    fun `theme override is merged over defaults`() {
        val doc = "theme:\n  primary: \"#ff00aa\"\n  radius: \"12px\"\n" + VALID_DOC
        val theme = loadYaml(doc).theme
        assertEquals("#ff00aa", theme.primary, "theme.primary")
        assertEquals("12px", theme.radius, "theme.radius")
        assertEquals("#7c3aed", theme.secondary, "theme.secondary should keep its default")
    }

    @Test
    fun `load rejects unknown theme keys`() {
        val doc = "theme:\n  custom-token: \"#123456\"\n" + VALID_DOC
        assertFailsWith<Exception> { loadYaml(doc) }
    }

    @Test
    fun `load rejects unknown fields`() {
        val doc = VALID_DOC.replace("landing page.", "landing page.\n  typo: nope")
        assertFailsWith<Exception> { loadYaml(doc) }
    }

    @Test
    fun `errors reports every blank required field`() {
        val config = loadYaml(VALID_DOC)
        val broken = config.copy(
            site = config.site.copy(name = " "),
            hero = config.hero.copy(headline = ""),
            features = config.features.copy(items = emptyList()),
        )
        val problems = errors(broken)
        assertEquals(3, problems.size, "got $problems")
    }

    @Test
    fun `an invalid colour is reported against its theme key`() {
        val config = loadYaml("theme:\n  primary: \"not-a-color\"\n" + VALID_DOC)
        val problems = errors(config)
        assertEquals(1, problems.size, "got $problems")
        assertContains(problems.single(), "theme.primary")
    }
}

/** Every key the Go original derives, so a rename cannot slip through. */
private val EXPECTED_TOKENS = listOf(
    "base-100", "base-200", "base-300", "base-content",
    "primary", "primary-dark", "primary-soft", "primary-content",
    "secondary", "secondary-content", "neutral", "neutral-faint",
    "border", "border-soft", "info", "warning", "success", "error", "radius",
)
