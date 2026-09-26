package io.github.hieudoanm.landify.config

import kotlinx.serialization.Serializable

/** Download page data: version and license badges plus per-OS buttons. */
@Serializable
data class Download(
    val version: String = "",
    val license: String = "",
    val repo: String = "",
    val install: String = "",
    val platforms: List<Platform> = emptyList(),
)

/** One OS/arch download button on a download page. */
@Serializable
data class Platform(
    val name: String = "",
    val icon: String = "",
    val href: String = "",
)

/** Pricing page data: a grid of tier cards with a highlighted plan. */
@Serializable
data class Pricing(
    val heading: String = "",
    val sub: String = "",
    val note: String = "",
    val tiers: List<PricingTier> = emptyList(),
)

/** One card in a pricing grid. */
@Serializable
data class PricingTier(
    val name: String = "",
    val price: String = "",
    val period: String = "",
    val tag: String = "",
    val cta: Button = Button(),
    val perks: List<String> = emptyList(),
)

/** App page data: store badges, a rating line, and a portrait gallery. */
@Serializable
data class App(
    val stores: List<AppStore> = emptyList(),
    val ratings: String = "",
    val reviews: String = "",
    val shots: List<Shot> = emptyList(),
)

/** A store download link with an optional emoji icon. */
@Serializable
data class AppStore(
    val name: String = "",
    val icon: String = "",
    val href: String = "",
)

/** One portrait (9:16) app screenshot with an optional caption. */
@Serializable
data class Shot(
    val title: String = "",
    val src: String = "",
)
