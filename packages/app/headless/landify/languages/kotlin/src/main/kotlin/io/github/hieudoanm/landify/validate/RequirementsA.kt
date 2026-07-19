package io.github.hieudoanm.landify.validate

import io.github.hieudoanm.landify.config.Config

/** `waitlist` needs a launch date, an email form, and social links. */
internal fun requireWaitlist(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.require(config.waitlist.launches, "waitlist.launches")
    p.require(config.waitlist.heading, "waitlist.heading")
    p.require(config.waitlist.body, "waitlist.body")
    p.require(config.waitlist.form.action, "waitlist.form.action")
    p.require(config.waitlist.form.button, "waitlist.form.button")
    config.waitlist.social.forEachIndexed { i, s ->
        p.require(s.label, "waitlist.social[$i].label")
        p.require(s.href, "waitlist.social[$i].href")
    }
}

/** `event` needs a date, a venue, a ticket button, an agenda, and speakers. */
internal fun requireEvent(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.require(config.event.date, "event.date")
    p.require(config.event.venue.name, "event.venue.name")
    p.require(config.event.primary.label, "event.primary.label")
    p.require(config.event.primary.href, "event.primary.href")
    p.requireNotEmpty(config.event.agenda.size, "event.agenda", "event.agenda must contain at least one item")
    config.event.agenda.forEachIndexed { i, item ->
        p.require(item.time, "event.agenda[$i].time")
        p.require(item.title, "event.agenda[$i].title")
    }
    p.requireNotEmpty(
        config.event.speakers.size,
        "event.speakers",
        "event.speakers must contain at least one speaker",
    )
    config.event.speakers.forEachIndexed { i, sp ->
        p.require(sp.name, "event.speakers[$i].name")
        p.require(sp.role, "event.speakers[$i].role")
    }
}

/** `download` needs version, repo, platforms, features, and a CTA. */
internal fun requireDownload(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.require(config.download.version, "download.version")
    p.require(config.download.repo, "download.repo")
    p.requireNotEmpty(
        config.download.platforms.size,
        "download.platforms",
        "download.platforms must contain at least one platform",
    )
    config.download.platforms.forEachIndexed { i, platform ->
        p.require(platform.name, "download.platforms[$i].name")
        p.require(platform.href, "download.platforms[$i].href")
    }
    requireFeatures(config, p)
    requireCta(config, p)
}

/** `app` needs store badges and any screenshots. */
internal fun requireApp(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.requireNotEmpty(config.app.stores.size, "app.stores", "app.stores must contain at least one store")
    config.app.stores.forEachIndexed { i, s ->
        p.require(s.name, "app.stores[$i].name")
        p.require(s.href, "app.stores[$i].href")
    }
    config.app.shots.forEachIndexed { i, shot ->
        p.require(shot.src, "app.shots[$i].src")
    }
}

/** `docs` needs at least one topic card. */
internal fun requireDocs(config: Config, p: Problems) {
    p.require(config.hero.headline, "hero.headline")
    p.require(config.hero.subheadline, "hero.subheadline")
    p.requireNotEmpty(config.docs.packages.size, "docs.packages", "docs.packages must contain at least one card")
    config.docs.packages.forEachIndexed { i, card ->
        p.require(card.title, "docs.packages[$i].title")
        p.require(card.href, "docs.packages[$i].href")
    }
}
