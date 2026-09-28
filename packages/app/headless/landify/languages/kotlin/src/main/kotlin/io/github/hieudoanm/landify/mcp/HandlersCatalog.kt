package io.github.hieudoanm.landify.mcp

import io.github.hieudoanm.landify.validate.knownTypes
import kotlinx.serialization.Serializable

/**
 * Explains what each layout renders. `landify types` has to carry this because a
 * model picking a page type has no other way to learn which one fits, and a
 * wrong guess costs a full rewrite of the config.
 */
private val TYPE_DESCRIPTIONS = mapOf(
    "app" to "App store listing: store badges, ratings and a portrait 9:16 screenshot gallery.",
    "docs" to "Documentation index: topic card links plus an optional code sample.",
    "download" to "Release download: version and license badges, per-OS buttons, install snippet.",
    "event" to "Event page: date and venue strip, agenda timeline, speaker grid.",
    "faq" to "FAQ: native <details> rows, no JavaScript.",
    "linktree" to "Link-in-bio: compact profile with big link cards. The only type without a hero.",
    "portfolio" to "Personal portfolio: avatar, skills chips, project grid.",
    "pricing" to "Pricing table: tier cards with a highlighted most-popular plan.",
    "product" to "Product landing page: hero, features, demo video and CTA. The default type.",
    "status" to "Status page: state banner, uptime stats, incident log.",
    "team" to "Team page: values strip and member cards.",
    "waitlist" to "Waitlist capture: email form, launch date, social links.",
)

/** One row of the types listing. */
@Serializable
data class TypeEntry(val name: String, val description: String)

/** The payload of the types tool. */
@Serializable
data class TypesResult(val count: Int, val types: List<TypeEntry>)

/** One row of the themes listing. */
@Serializable
data class ThemeEntry(val name: String, val description: String)

/** The payload of the themes tool. */
@Serializable
data class ThemesResult(val count: Int, val total: Int, val themes: List<ThemeEntry>)

/** Lists the supported page types with what each one renders. */
fun handleTypes(): ToolHandler = ToolHandler {
    val entries = knownTypes().map { TypeEntry(it, TYPE_DESCRIPTIONS[it].orEmpty()) }
    textResult(marshal(TypesResult(entries.size, entries)))
}

/**
 * Lists the built-in presets, optionally filtered by a substring of the name or
 * description. The catalogue is 64 entries, so an unfiltered listing is a lot
 * of text for a model to read when it only wants "the dark ones".
 */
fun handleThemes(): ToolHandler = ToolHandler { raw ->
    val query = argsString(raw, "query").trim().lowercase()
    val all = io.github.hieudoanm.landify.themes.themes()
    val matched = all
        .filter { query.isEmpty() || it.name.lowercase().contains(query) || it.description.lowercase().contains(query) }
        .sortedBy { it.name }
        .map { ThemeEntry(it.name, it.description) }
    textResult(marshal(ThemesResult(matched.size, all.size, matched)))
}
