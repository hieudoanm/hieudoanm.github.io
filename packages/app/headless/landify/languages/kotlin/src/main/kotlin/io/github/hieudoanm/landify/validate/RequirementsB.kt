package io.github.hieudoanm.landify.validate

import io.github.hieudoanm.landify.config.Config

/** The feature grid requirement, shared by `product` and `download`. */
internal fun requireFeatures(config: Config, p: Problems) {
    p.requireNotEmpty(
        config.features.items.size,
        "features.items",
        "features.items must contain at least one feature",
    )
    config.features.items.forEachIndexed { i, f ->
        p.require(f.title, "features.items[$i].title")
        p.require(f.body, "features.items[$i].body")
    }
}

/** The closing call to action requirement, shared by `product` and `download`. */
internal fun requireCta(config: Config, p: Problems) {
    p.require(config.cta.heading, "cta.heading")
    p.require(config.cta.body, "cta.body")
    p.require(config.cta.button.label, "cta.button.label")
    p.require(config.cta.button.href, "cta.button.href")
}

/** `portfolio` has no hero: the profile block carries the heading instead. */
internal fun requirePortfolio(config: Config, p: Problems) {
    p.require(config.portfolio.name, "portfolio.name")
    p.require(config.portfolio.about, "portfolio.about")
    p.requireNotEmpty(
        config.portfolio.projects.size,
        "portfolio.projects",
        "portfolio.projects must contain at least one project",
    )
    config.portfolio.projects.forEachIndexed { i, project ->
        p.require(project.title, "portfolio.projects[$i].title")
        p.require(project.body, "portfolio.projects[$i].body")
        p.require(project.href, "portfolio.projects[$i].href")
    }
}

/** `faq` needs at least one question. */
internal fun requireFaq(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.requireNotEmpty(config.faq.items.size, "faq.items", "faq.items must contain at least one item")
    config.faq.items.forEachIndexed { i, item ->
        p.require(item.question, "faq.items[$i].question")
        p.require(item.answer, "faq.items[$i].answer")
    }
}

/** `team` needs members; values are optional but validated when present. */
internal fun requireTeam(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.requireNotEmpty(config.team.members.size, "team.members", "team.members must contain at least one member")
    config.team.members.forEachIndexed { i, m ->
        p.require(m.name, "team.members[$i].name")
        p.require(m.role, "team.members[$i].role")
    }
    config.team.values.forEachIndexed { i, v ->
        p.require(v.title, "team.values[$i].title")
        p.require(v.body, "team.values[$i].body")
    }
}

/** `status` needs a known state; incident states are checked when present. */
internal fun requireStatus(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.require(config.status.state, "status.state")
    val state = config.status.state
    if (state.isNotEmpty() && state !in STATUS_STATES) {
        p.add("status.state must be one of ${STATUS_STATES.joinToString(" | ")}")
    }
    config.status.stats.forEachIndexed { i, s ->
        p.require(s.label, "status.stats[$i].label")
        p.require(s.value, "status.stats[$i].value")
    }
    config.status.incidents.forEachIndexed { i, t ->
        p.require(t.date, "status.incidents[$i].date")
        p.require(t.title, "status.incidents[$i].title")
        if (t.state.isNotEmpty() && t.state !in INCIDENT_STATES) {
            p.add("status.incidents[$i].state must be one of ${INCIDENT_STATES.joinToString(" | ")}")
        }
    }
}

/** `linktree` is the only type without a hero, so it only needs its cards. */
internal fun requireLinktree(config: Config, p: Problems) {
    p.requireNotEmpty(config.linktree.cards.size, "linktree.cards", "linktree.cards must contain at least one card")
    config.linktree.cards.forEachIndexed { i, c ->
        p.require(c.title, "linktree.cards[$i].title")
        p.require(c.href, "linktree.cards[$i].href")
    }
    config.linktree.social.forEachIndexed { i, s ->
        p.require(s.label, "linktree.social[$i].label")
        p.require(s.href, "linktree.social[$i].href")
    }
}

/** `pricing` needs tiers with a price and a call to action. */
internal fun requirePricing(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.requireNotEmpty(config.pricing.tiers.size, "pricing.tiers", "pricing.tiers must contain at least one tier")
    config.pricing.tiers.forEachIndexed { i, t ->
        p.require(t.name, "pricing.tiers[$i].name")
        p.require(t.price, "pricing.tiers[$i].price")
        p.require(t.cta.label, "pricing.tiers[$i].cta.label")
        p.require(t.cta.href, "pricing.tiers[$i].cta.href")
    }
}

/** `product` is the original layout and keeps the strictest requirements. */
internal fun requireProduct(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.require(config.hero.primary.label, "hero.primary.label")
    p.require(config.hero.primary.href, "hero.primary.href")
    p.require(config.hero.image.src, "hero.image.src")
    p.require(config.demo.video.src, "demo.video.src")
    requireFeatures(config, p)
    requireCta(config, p)
}

private val STATUS_STATES = listOf("operational", "degraded", "outage", "maintenance")
private val INCIDENT_STATES = listOf("investigating", "monitoring", "resolved")
