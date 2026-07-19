package io.github.hieudoanm.landify.config

import kotlinx.serialization.Serializable

/** Status page data: a state banner, uptime stats, and an incident log. */
@Serializable
data class Status(
    val heading: String = "",
    val sub: String = "",
    val state: String = "",
    val updated: String = "",
    val announcement: String = "",
    val stats: List<StatusStat> = emptyList(),
    val incidents: List<StatusTicket> = emptyList(),
)

/** One uptime/health figure. */
@Serializable
data class StatusStat(
    val label: String = "",
    val value: String = "",
)

/** One row in the recent incidents list. */
@Serializable
data class StatusTicket(
    val date: String = "",
    val title: String = "",
    val state: String = "",
    val body: String = "",
)

/**
 * Linktree page data: a centered list of big link cards. It has no hero
 * section; the profile block replaces it.
 */
@Serializable
data class Linktree(
    val heading: String = "",
    val sub: String = "",
    val avatar: String = "",
    val cards: List<LinkCard> = emptyList(),
    val social: List<NavItem> = emptyList(),
)

/** One big rounded button on a linktree page. */
@Serializable
data class LinkCard(
    val title: String = "",
    val href: String = "",
    val icon: String = "",
    val note: String = "",
)
