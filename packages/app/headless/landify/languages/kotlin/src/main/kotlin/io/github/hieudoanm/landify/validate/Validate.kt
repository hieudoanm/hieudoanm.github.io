package io.github.hieudoanm.landify.validate

import io.github.hieudoanm.landify.color.parseHex
import io.github.hieudoanm.landify.config.Config

/** The supported page types, in alphabetical order. */
fun knownTypes(): List<String> = listOf(
    "app", "docs", "download", "event", "faq", "linktree",
    "portfolio", "pricing", "product", "status", "team", "waitlist",
)

/**
 * Canonicalizes a `type:` value: empty maps to the default `product`. Unknown
 * values pass through unchanged so validation can reject them by name.
 */
fun normalizeType(type: String): String = if (type.isEmpty()) "product" else type

private fun isKnownType(type: String): Boolean = type in knownTypes()

/**
 * The template to render for a `type:` value: empty becomes `product`, and an
 * unknown value also falls back to `product` so a hand-built config still
 * renders. Validation, not rendering, is what rejects unknown types.
 */
fun renderType(type: String): String {
    val kind = normalizeType(type)
    return if (isKnownType(kind)) kind else "product"
}

/**
 * Collects schema problems in the order the Go original reports them, so the
 * CLI's error text is identical.
 */
class Problems {
    private val messages = mutableListOf<String>()

    fun add(message: String) {
        messages += message
    }

    /** Mirrors the Go `require` closure: blank (or whitespace-only) is an error. */
    fun require(value: String, field: String) {
        if (value.isBlank()) add("$field is required")
    }

    /** Reports a "must contain at least one" error when [items] is empty. */
    fun requireNotEmpty(count: Int, field: String, message: String) {
        if (count == 0) add(message)
    }

    fun list(): List<String> = messages
}

/** Every schema problem in [config]; empty means the config is valid. */
fun errors(config: Config): List<String> {
    val problems = Problems()
    val kind = normalizeType(config.pageType)
    if (!isKnownType(kind)) {
        problems.add("type \"$kind\" is not supported (available: ${knownTypes().joinToString(", ")})")
        return problems.list()
    }
    requireCommon(config, problems)
    when (kind) {
        "waitlist" -> requireWaitlist(config, problems)
        "event" -> requireEvent(config, problems)
        "download" -> requireDownload(config, problems)
        "app" -> requireApp(config, problems)
        "docs" -> requireDocs(config, problems)
        "portfolio" -> requirePortfolio(config, problems)
        "faq" -> requireFaq(config, problems)
        "team" -> requireTeam(config, problems)
        "status" -> requireStatus(config, problems)
        "linktree" -> requireLinktree(config, problems)
        "pricing" -> requirePricing(config, problems)
        else -> requireProduct(config, problems)
    }
    requireTheme(config, problems)
    return problems.list()
}

/** Reports whether [config] satisfies the schema. */
fun isValid(config: Config): Boolean = errors(config).isEmpty()

/** Requirements shared by every page type. */
private fun requireCommon(config: Config, p: Problems) {
    p.require(config.site.name, "site.name")
    p.require(config.site.description, "site.description")
    p.requireNotEmpty(config.site.nav.size, "site.nav", "site.nav must contain at least one link")
    config.site.nav.forEachIndexed { i, item ->
        p.require(item.label, "site.nav[$i].label")
        p.require(item.href, "site.nav[$i].href")
    }
    p.require(config.footer.copyright, "footer.copyright")
}

/** The eight authored colors must be `#RRGGBB`; `radius` is not a color. */
private fun requireTheme(config: Config, p: Problems) {
    val theme = config.theme
    val colors = listOf(
        "base" to theme.base,
        "primary" to theme.primary,
        "secondary" to theme.secondary,
        "neutral" to theme.neutral,
        "info" to theme.info,
        "warning" to theme.warning,
        "success" to theme.success,
        "error" to theme.error,
    )
    colors.forEach { (name, value) ->
        runCatching { parseHex(value) }
            .onFailure { p.add("theme.$name ($value) must be a #RRGGBB color") }
    }
}
