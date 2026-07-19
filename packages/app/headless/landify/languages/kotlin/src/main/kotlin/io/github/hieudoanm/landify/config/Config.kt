package io.github.hieudoanm.landify.config

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * The top-level schema for `landify.yaml`.
 *
 * [pageType] selects the page template and defaults to `product` when empty.
 * Every section defaults to an empty instance, so a YAML that omits a whole
 * section still parses; [io.github.hieudoanm.landify.validate.Validate] is what
 * reports the fields a given page type actually requires.
 */
@Serializable
data class Config(
    @SerialName("type") val pageType: String = "",
    val theme: Theme = Theme(),
    val site: Site = Site(),
    val hero: Hero = Hero(),
    val features: Features = Features(),
    val demo: Demo = Demo(),
    val cta: Cta = Cta(),
    val footer: Footer = Footer(),
    val waitlist: Waitlist = Waitlist(),
    val event: Event = Event(),
    val download: Download = Download(),
    val pricing: Pricing = Pricing(),
    val app: App = App(),
    val portfolio: Portfolio = Portfolio(),
    val docs: Docs = Docs(),
    val faq: Faq = Faq(),
    val team: Team = Team(),
    val status: Status = Status(),
    val linktree: Linktree = Linktree(),
)
