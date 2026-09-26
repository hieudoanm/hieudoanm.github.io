package io.github.hieudoanm.landify.config

import kotlinx.serialization.Serializable

/** Brand identity and global navigation. */
@Serializable
data class Site(
    val name: String = "",
    val mark: String = "",
    val description: String = "",
    val nav: List<NavItem> = emptyList(),
)

/** A single link shown in the navbar and footer. */
@Serializable
data class NavItem(
    val label: String = "",
    val href: String = "",
)

/** The first section visitors see. */
@Serializable
data class Hero(
    val badge: String = "",
    val headline: String = "",
    val subheadline: String = "",
    val primary: Button = Button(),
    val secondary: Button = Button(),
    val image: HeroImage = HeroImage(),
)

/** A labelled link used for call-to-action buttons. */
@Serializable
data class Button(
    val label: String = "",
    val href: String = "",
)

/** The required 16:9 hero image shown in the hero section. */
@Serializable
data class HeroImage(
    val src: String = "",
    val alt: String = "",
)

/** The copyright line and a set of links. */
@Serializable
data class Footer(
    val copyright: String = "",
    val links: List<NavItem> = emptyList(),
)
