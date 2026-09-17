package io.github.hieudoanm.landify.validate

import io.github.hieudoanm.landify.VALID_DOC
import io.github.hieudoanm.landify.config.Config
import io.github.hieudoanm.landify.config.loadYaml
import io.github.hieudoanm.landify.config.loadYamlFile
import io.github.hieudoanm.landify.render.examplePath
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ValidateTest {
    @Test
    fun `every known type is listed and normalised`() {
        assertEquals(EXPECTED_TYPES, knownTypes())
        assertEquals("product", normalizeType(""), "an empty type defaults to product")
        for (type in knownTypes()) {
            assertEquals(type, normalizeType(type))
        }
    }

    @Test
    fun `every shipped example passes validation`() {
        for (type in knownTypes()) {
            val config = loadYamlFile(examplePath(type))
            val problems = errors(config)
            assertTrue(problems.isEmpty(), "$type example is invalid: $problems")
            assertEquals(type, normalizeType(config.pageType), "$type example type")
        }
    }

    @Test
    fun `an unsupported type is rejected by name`() {
        val problems = errors(loadYaml("type: brochure\n" + VALID_DOC))
        assertTrue(
            problems.any { it.contains("""type "brochure" is not supported""") },
            "got $problems",
        )
    }

    @Test
    fun `each page type requires its own section`() {
        for ((type, expected) in REQUIRED_SECTIONS) {
            val stripped = blankOwnSection(loadYamlFile(examplePath(type)))
            assertContains(errors(stripped), expected, "$type without its section")
        }
    }

    @Test
    fun `status rejects an unknown incident state`() {
        val config = loadYamlFile(examplePath("status"))
        val broken = config.copy(
            status = config.status.copy(incidents = config.status.incidents.map { it.copy(state = "on fire") }),
        )
        assertTrue(
            errors(broken).any {
                it.contains("status.incidents[0].state must be one of investigating | monitoring | resolved")
            },
            "got ${errors(broken)}",
        )
    }

    @Test
    fun `a blank required field is reported`() {
        val config = loadYaml(VALID_DOC)
        val problems = errors(config.copy(site = config.site.copy(name = " ")))
        assertTrue(problems.any { it.contains("site.name") }, "got $problems")
    }
}

/** Empties the list a page type cannot render without. */
private fun blankOwnSection(config: Config): Config = when (normalizeType(config.pageType)) {
    "waitlist" -> config.copy(waitlist = config.waitlist.copy(form = config.waitlist.form.copy(action = "")))
    "event" -> config.copy(event = config.event.copy(agenda = emptyList()))
    "download" -> config.copy(download = config.download.copy(platforms = emptyList()))
    "pricing" -> config.copy(pricing = config.pricing.copy(tiers = emptyList()))
    "app" -> config.copy(app = config.app.copy(stores = emptyList()))
    "portfolio" -> config.copy(portfolio = config.portfolio.copy(projects = emptyList()))
    "docs" -> config.copy(docs = config.docs.copy(packages = emptyList()))
    "faq" -> config.copy(faq = config.faq.copy(items = emptyList()))
    "team" -> config.copy(team = config.team.copy(members = emptyList()))
    "linktree" -> config.copy(linktree = config.linktree.copy(cards = emptyList()))
    "status" -> config.copy(status = config.status.copy(state = "on fire"))
    else -> config
}

/** The message each type emits when its own required content is missing. */
private val REQUIRED_SECTIONS: Map<String, String> = mapOf(
    "waitlist" to "waitlist.form.action",
    "event" to "event.agenda must contain at least one item",
    "download" to "download.platforms must contain at least one platform",
    "pricing" to "pricing.tiers must contain at least one tier",
    "app" to "app.stores must contain at least one store",
    "portfolio" to "portfolio.projects must contain at least one project",
    "docs" to "docs.packages must contain at least one card",
    "faq" to "faq.items must contain at least one item",
    "team" to "team.members must contain at least one member",
    "status" to "status.state must be one of operational | degraded | outage | maintenance",
    "linktree" to "linktree.cards must contain at least one card",
)

/** The upstream type list, in gallery order. */
private val EXPECTED_TYPES = listOf(
    "product", "waitlist", "event", "download", "app", "docs",
    "portfolio", "faq", "team", "status", "linktree", "pricing",
)
